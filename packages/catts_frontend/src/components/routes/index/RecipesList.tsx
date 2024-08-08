import { useListRecipes } from "@/recipe/hooks/useListRecipes";
import RecipeListItem from "./RecipeListItem";

export default function RecipesList() {
  const { data, isPending } = useListRecipes();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>Latest recipes</h1>
      {data.map((recipe) => (
        <RecipeListItem key={recipe.name} recipe={recipe} />
      ))}
    </div>
  );
}
