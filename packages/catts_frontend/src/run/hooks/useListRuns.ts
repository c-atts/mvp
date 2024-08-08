import { useSupabase } from "@/lib/supabase/SupabaseContext";
import { useQuery } from "@tanstack/react-query";

export const useListRuns = () => {
  const supabase = useSupabase();
  return useQuery({
    queryKey: ["runs_list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("run")
        .select(`id, created, creator, chain_id, recipe (name)`);
      if (error) throw error;
      return data;
    },
  });
};
