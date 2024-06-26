import { createLazyFileRoute } from "@tanstack/react-router";
import RecipesList from "../components/routes/index/RecipesList";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <RecipesList />;
}
