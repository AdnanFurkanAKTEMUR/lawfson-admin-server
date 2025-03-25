import { Context } from "@contextTypes/contextTypes";
import { Category } from "@entities/Category";
import { Company } from "@entities/Company";
import { Product } from "@entities/Product";
import getAllSubcategoryIds from "@helpers/getSubcategoriesIds";
import { loggerInfo } from "@helpers/logger";
import { Between, ILike, In, LessThan, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const ProductResolver = {
  Query: {
    getProduct: async (_parent: any, args: any, _context: Context, _info: any): Promise<Product> => {
      const { id } = args.input;
      try {
        const product = await Product.findOne({
          where: { id },
          relations: ["category", "company"],
        });
        if (!product) throw new Error("Hata:Ürün bulunamadı!");
        return product;
      } catch (e) {
        throw new Error(e);
      }
    },
    productMostClickedThree: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;

      if (!user || !user.companyId) throw new Error("Hata: Yetkisiz İşlem!");

      try {
        const topProducts = await Product.find({
          where: { company: { id: user.companyId }, clickedRate: LessThan(999999) }, // company'ye ait ürünler
          order: { clickedRate: "DESC" }, // En çok tıklananı önce getir
          take: 3, // İlk 3 ürünü al
          relations: ["category"], // Kategori ilişkisini getir
        });

        return topProducts;
      } catch (error) {
        throw new Error(`Hata: ${error.message}`);
      }
    },
    productMostClicked: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;

      if (!user || !user.companyId) {
        throw new Error("Unauthorized");
      }

      try {
        const now = new Date();
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const startOfWeek = new Date();
        startOfWeek.setDate(now.getDate() - 7);
        startOfWeek.setHours(0, 0, 0, 0);

        const startOfMonth = new Date();
        startOfMonth.setDate(now.getDate() - 30);
        startOfMonth.setHours(0, 0, 0, 0);

        const daily = await Product.find({
          where: {
            updatedAt: Between(startOfDay, now),
            company: { id: user.companyId },
          },

          order: { clickedRate: "DESC" },
          take: 5, // İlk 10 ürünü getir
        });

        const weekly = await Product.find({
          where: {
            updatedAt: MoreThanOrEqual(startOfWeek),
            company: { id: user.companyId },
          },
          order: { clickedRate: "DESC" },
          take: 5,
        });

        const monthly = await Product.find({
          where: {
            updatedAt: MoreThanOrEqual(startOfMonth),
            company: { id: user.companyId },
          },
          order: { clickedRate: "DESC" },
          take: 5,
        });

        return {
          daily: daily || [], // Eğer `null` ise boş array döndür
          weekly: weekly || [],
          monthly: monthly || [],
        };
      } catch (e) {
        console.error("Error fetching most clicked products:", e);
        throw new Error("Something went wrong");
      }
    },
    getProductOfCategory: async (_parent: any, args: any, _context: Context, _info: any): Promise<Product[] | null> => {
      const { categoryId } = args.input;
      try {
        const category = await Category.findOne({
          where: { id: categoryId },
          relations: ["subcategories", "subcategories.subcategories"],
        });
        if (!category) {
          throw new Error("Category not found");
        }
        const categoryIds = getAllSubcategoryIds(category);
        const products = await Product.find({
          where: {
            category: In(categoryIds),
          },
        });
        return products;
      } catch (e) {
        throw new Error(e);
      }
    },
    productsOfCompany: async (_parent: any, _args: any, context: Context, _info: any): Promise<Product[] | null> => {
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata: Giriş yapmalısınız!");
      try {
        const products = await Product.find({ where: { company: { id: user.companyId } }, relations: ["category"] });

        return products;
      } catch (e) {
        throw new Error(e);
      }
    },
    //client tarafı
    searchForProducts: async (_parent: any, args: any, _context: any, _info: any) => {
      const { productName, color, city, country, minPrice, maxPrice, categoryId } = args.input;
      try {
        if (productName == "tumurunler") {
          const products = await Product.find({ where: { onAd: true } });
          return products;
        }
        const prefix = "catafa";

        if (productName.startsWith(prefix)) {
          const afterPrefix = productName.substring(prefix.length); // veya slice(prefix.length)
          console.log(afterPrefix); // "75"
          const category = await Category.findOne({
            where: { id: parseInt(afterPrefix) },
            relations: ["subcategories", "subcategories.subcategories"],
          });
          if (!category) {
            throw new Error("Category not found");
          }
          const categoryIds = getAllSubcategoryIds(category);
          const products = await Product.find({
            where: {
              category: In(categoryIds),
            },
          });
          return products;
        }
        const where: any = {};

        if (productName) {
          where.productName = ILike(`%${productName}%`); // Case-insensitive search
        }
        if (color) {
          where.color = ILike(`%${color}%`);
        }
        if (city) {
          where.city = ILike(`%${city}%`);
        }
        if (country) {
          where.country = ILike(`%${country}%`);
        }
        if (minPrice !== undefined && maxPrice !== undefined) {
          where.price = Between(minPrice, maxPrice);
        } else if (minPrice !== undefined) {
          where.price = MoreThanOrEqual(minPrice);
        } else if (maxPrice !== undefined) {
          where.price = LessThanOrEqual(maxPrice);
        }
        where.onAd = true;
        if (categoryId) {
          const category = await Category.findOne({ where: { id: parseInt(categoryId) }, relations: ["subcategories"] });
          if (category) {
            const categoryIds = [category.id, ...(category.subcategories?.map((sub) => sub.id) || [])];
            where.category = { id: In(categoryIds) };
          }
        }

        const products = await Product.find({ where, relations: ["company", "category"] });
        return products;
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  Mutation: {
    createProduct: async (_parent: any, args: any, context: Context, _info: any): Promise<Product | null> => {
      const { productName, categoryId, images, widths, length, thickness, color, origin, price, surfaceTreatment, description, city, onAd, country, brand, inStock } = args.input;
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata: Giriş yapmalısınız!");
      //todo yetki kontrolü
      try {
        const company = await Company.findOne({ where: { id: user.companyId } });
        if (!company) throw new Error("Hata: Firma Bulunamadı!");

        let category = null;
        if (categoryId) {
          // Kategori null olabilir.
          category = await Category.findOne({ where: { id: categoryId } });
        }

        const product = Product.create({
          productName: productName,
          images: images || null,
          widths: widths || null,
          length: length || null,
          thickness: thickness || null,
          color: color || null,
          origin: origin || null,
          surfaceTreatment: surfaceTreatment || null,
          description: description || null,
          onAd: onAd || false,
          country: country || null,
          city: city || null,
          brand: brand || null,
          inStock: inStock || false,
          price: parseFloat(price) || null,
        });
        if (onAd) {
          product.adDate = new Date();
        }
        if (category) {
          product.category = category;
        }

        product.company = company;
        await product.save();
        loggerInfo(user.companyName, user.companyId, "Product", user.userName, user.id, `Ürün oluşturuldu. Ürün id:${product.id}. `);
        return product;
      } catch (e) {
        throw new Error(e?.message + "Ürün oluşturulurken bir hata oluştu.");
      }
    },
    updateProduct: async (_parent: any, args: any, context: Context, _info: any): Promise<Product | null> => {
      const { id, productName, price, categoryId, images, widths, length, thickness, color, origin, surfaceTreatment, description, onAd, city, country, brand, inStock } = args.input;
      const { user } = context;

      if (!user || user.id == undefined) throw new Error("Hata: Giriş yapmalısınız!");
      //todo yetki kontrolü
      try {
        const product = await Product.findOne({ where: { id: id } });
        if (!product) throw new Error("Ürün bulunamadı!");

        // Kategori güncellemesi
        if (categoryId && product.category?.id != categoryId) {
          const category = await Category.findOne({ where: { id: categoryId } });
          if (!category) throw new Error("Kategori Bulunamadı!");
          product.category = category;
        }

        // Ürün adı güncellemesi
        if (productName && product.productName !== productName) {
          product.productName = productName;
        }

        // Yeni alanların güncellenmesi
        if (images !== undefined) {
          product.images = images; // null olabilir, bu yüzden undefined kontrolü
        }
        if (inStock !== undefined) {
          product.inStock = inStock; // null olabilir, bu yüzden undefined kontrolü
        }
        if (price !== undefined) {
          const pp = parseFloat(price);
          console.log(pp);
          console.log(typeof pp);
          product.price = parseFloat(price); // null olabilir, bu yüzden undefined kontrolü
        }
        if (widths !== undefined) {
          product.widths = widths;
        }
        if (length !== undefined) {
          product.length = length;
        }
        if (thickness !== undefined) {
          product.thickness = thickness;
        }
        if (color !== undefined) {
          product.color = color;
        }
        if (origin !== undefined) {
          product.origin = origin;
        }
        if (surfaceTreatment !== undefined) {
          product.surfaceTreatment = surfaceTreatment;
        }
        if (description !== undefined) {
          product.description = description;
        }
        if (onAd !== undefined) {
          product.onAd = onAd;
        }
        if (country !== undefined) {
          product.country = country;
        }
        if (city !== undefined) {
          product.city = city;
        }
        if (brand !== undefined) {
          product.brand = brand;
        }

        await product.save();
        loggerInfo(user.companyName, user.companyId, "Product", user.userName, user.id, `Ürün bilgileri güncellendi. Değiştirilen id:${product.id}. `);
        return product;
      } catch (e) {
        throw new Error(e.message || "Ürün güncellenirken bir hata oluştu.");
      }
    },
    deleteProduct: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id } = args.input;
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata: Giriş yapmalısınız!");
      try {
        const product = await Product.findOne({ where: { id } });
        if (!product) throw new Error("Ürün bulunamadı!");

        await product.remove();
        loggerInfo(user.companyName, user.companyId, "Product", user.userName, user.id, `Ürün silindi. Değiştirilen id:${product.id}. `);
        return { status: true, msg: "Ürün Başarı ile silindi!" };
      } catch (e) {
        throw new Error(e);
      }
    },
    updateProductClickedRate: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id } = args.input;

      try {
        const product = await Product.findOne({ where: { id } });
        if (!product) throw new Error("Hata: Ürün Bulunamadı");
        if (product.clickedRate == null) {
          product.clickedRate = 1;
        } else {
          product.clickedRate = product.clickedRate + 1;
        }
        await product.save();
        return "Başarılı!";
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default ProductResolver;
