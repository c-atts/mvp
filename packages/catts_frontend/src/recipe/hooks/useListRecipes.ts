import { useSupabase } from "@/lib/supabase/SupabaseContext";
import { useQuery } from "@tanstack/react-query";

export const useListRecipes = () => {
  const supabase = useSupabase();
  return useQuery({
    queryKey: ["recipe_list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("recipe").select("*");
      if (error) throw error;
      return data;
    },
  });
};