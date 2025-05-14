export function extractColumns(data, excludedColumns = [], customWidths = []) {
    const columns = new Set();

    // Helper function to capitalize first letter
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Convert customWidths array to a map for fast lookup
    const widthMap = new Map();
    customWidths.forEach(({ field, width }) => {
        widthMap.set(field, width);
    });

    // Collect all unique keys that aren't excluded
    data.forEach(entry => {
        Object.keys(entry).forEach(key => {
            if (!excludedColumns.includes(key)) {
                columns.add(key);
            }
        });
    });

    // Map keys to column definitions with widths or flex
    const columnDefinitions = Array.from(columns).map(key => {
        const definition = {
            field: key,
            headerName: capitalize(key)
        };

        if (widthMap.has(key)) {
            definition.width = widthMap.get(key);
        } else {
            definition.flex = 1;
        }

        return definition;
    });

    return columnDefinitions;
}