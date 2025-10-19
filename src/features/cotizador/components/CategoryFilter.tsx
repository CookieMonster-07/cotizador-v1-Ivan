interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semifold mb-3 text-gray-800">Filtrar por Categoría</h3>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onCategoryChange(null)}
                    className={`px-4 py-2 rounded-md ${selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    Todas las categorías
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    )
}
