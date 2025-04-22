export const categoryColor = (category) => {
    switch (category) {
    case "noble gas":
        return "border-red-500 text-red-900 bg-red-200";
    case "alkaline earth metal":
        return "border-yellow-500 text-yellow-900 bg-yellow-200";
    case "diatomic nonmetal":
        return "border-teal-500 text-teal-900 bg-teal-200";
    case "alkali metal":
        return "border-purple-500 text-purple-900 bg-purple-200";
    case "transition metal":
        return "border-sky-500 text-sky-900 bg-sky-200";
    case "post-transition metal":
        return "border-indigo-500 text-indigo-900 bg-indigo-200";
    case "metalloid":
        return "border-orange-500 text-orange-900 bg-orange-200";
    case "halogen":
        return "border-fuchsia-500 text-fuchsia-900 bg-fuchsia-200";
    case "lanthanide":
        return "border-amber-600 text-amber-900 bg-amber-100";
    case "actinide":
        return "border-pink-700 text-pink-900 bg-pink-200";
    default:
        return "border-zinc-500 text-zinc-900 bg-zinc-200"; // Default color for unknown categories
    }
};