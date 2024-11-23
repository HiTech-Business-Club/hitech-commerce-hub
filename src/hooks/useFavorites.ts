import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSession } from "@supabase/auth-helpers-react";

export function useFavorites() {
  const session = useSession();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!session?.user) return [];
      const { data, error } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", session.user.id);

      if (error) throw error;
      return data.map((f) => f.product_id);
    },
    enabled: !!session?.user,
  });

  const toggleFavorite = useMutation({
    mutationFn: async (productId: number) => {
      if (!session?.user) {
        toast("Connexion requise", {
          description: "Veuillez vous connecter pour ajouter des favoris",
        });
        return;
      }

      const isFavorite = favorites.includes(productId);

      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", session.user.id)
          .eq("product_id", productId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: session.user.id, product_id: productId });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => {
      toast("Erreur", {
        description: "Une erreur est survenue",
      });
    },
  });

  return {
    favorites,
    isLoading,
    toggleFavorite: toggleFavorite.mutate,
    isFavorite: (productId: number) => favorites.includes(productId),
  };
}