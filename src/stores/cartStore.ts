import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  isLoading: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  initializeCart: (userId: string) => Promise<void>;
  total: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  cartId: null,
  isLoading: false,

  initializeCart: async (userId: string) => {
    set({ isLoading: true });
    try {
      // Get or create cart
      let { data: cart } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (!cart) {
        const { data: newCart, error } = await supabase
          .from("carts")
          .insert({ user_id: userId })
          .select("id")
          .single();

        if (error) throw error;
        cart = newCart;
      }

      // Get cart items
      const { data: items, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          products (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq("cart_id", cart.id);

      if (error) throw error;

      set({
        cartId: cart.id,
        items: items.map((item) => ({
          id: item.products.id,
          name: item.products.name,
          price: item.products.price,
          quantity: item.quantity,
          image: item.products.image_url,
        })),
      });
    } catch (error) {
      toast("Erreur", {
        description: "Impossible de charger le panier",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (item, quantity) => {
    const { cartId } = get();
    if (!cartId) return;

    try {
      const { error } = await supabase.from("cart_items").insert({
        cart_id: cartId,
        product_id: parseInt(item.id),
        quantity,
      });

      if (error) throw error;

      set((state) => ({
        items: [...state.items, { ...item, quantity }],
      }));

      toast("Produit ajouté", {
        description: `${item.name} a été ajouté à votre panier`,
      });
    } catch (error) {
      toast("Erreur", {
        description: "Impossible d'ajouter le produit au panier",
      });
    }
  },

  removeItem: async (id: string) => {
    const { cartId } = get();
    if (!cartId) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId)
        .eq("product_id", id);

      if (error) throw error;

      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    } catch (error) {
      toast("Erreur", {
        description: "Impossible de supprimer le produit du panier",
      });
    }
  },

  updateQuantity: async (id: string, quantity: number) => {
    const { cartId } = get();
    if (!cartId) return;

    try {
      if (quantity === 0) {
        await get().removeItem(id);
        return;
      }

      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("cart_id", cartId)
        .eq("product_id", id);

      if (error) throw error;

      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      }));
    } catch (error) {
      toast("Erreur", {
        description: "Impossible de mettre à jour la quantité",
      });
    }
  },

  clearCart: async () => {
    const { cartId } = get();
    if (!cartId) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId);

      if (error) throw error;

      set({ items: [] });
    } catch (error) {
      toast("Erreur", {
        description: "Impossible de vider le panier",
      });
    }
  },

  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));