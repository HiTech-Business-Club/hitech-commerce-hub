import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      "nav": {
        "home": "Accueil",
        "about": "À propos",
        "categories": "Catégories",
        "login": "Se connecter",
        "logout": "Se déconnecter"
      },
      "product": {
        "addToCart": "Ajouter au panier",
        "price": "Prix",
        "stock": "Stock disponible",
        "description": "Description"
      },
      "cart": {
        "title": "Votre Panier",
        "empty": "Votre panier est vide",
        "total": "Total",
        "checkout": "Passer la commande",
        "remove": "Retirer"
      }
    }
  },
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "about": "About",
        "categories": "Categories",
        "login": "Login",
        "logout": "Logout"
      },
      "product": {
        "addToCart": "Add to Cart",
        "price": "Price",
        "stock": "Available Stock",
        "description": "Description"
      },
      "cart": {
        "title": "Your Cart",
        "empty": "Your cart is empty",
        "total": "Total",
        "checkout": "Checkout",
        "remove": "Remove"
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "home": "الرئيسية",
        "about": "حول",
        "categories": "الفئات",
        "login": "تسجيل الدخول",
        "logout": "تسجيل الخروج"
      },
      "product": {
        "addToCart": "أضف إلى السلة",
        "price": "السعر",
        "stock": "المخزون المتوفر",
        "description": "الوصف"
      },
      "cart": {
        "title": "سلة التسوق",
        "empty": "سلة التسوق فارغة",
        "total": "المجموع",
        "checkout": "إتمام الشراء",
        "remove": "إزالة"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;