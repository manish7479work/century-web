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

export function convertToISO(dateString) {
    const date = new Date(dateString);
    return date.toISOString(); // returns in ISO 8601 format
}


export const fillMonthlyData = (inputData = []) => {
    const result = [];

    if (inputData.length === 0) return result;

    // Extract year and month from the first input record
    const [year, month] = inputData[0].query_timestamp.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-indexed here

    // Create a map from inputData for quick lookup
    const inputMap = new Map(
        inputData.map(item => [item.query_timestamp, item.count])
    );

    // Fill in the full month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = String(day).padStart(2, "0");
        const monthStr = String(month).padStart(2, "0");
        const formatted = `${year}-${monthStr}-${dayStr}`;

        result.push({
            // name: formatted,
            name: dayStr, // uncomment if you only want day number
            count: inputMap.get(formatted) || 0
        });
    }

    return result;
};

export const fillYearlyData = (inputData = []) => {
    const result = [];

    if (inputData.length === 0) return result;

    // Extract year from the first input record
    const [year] = inputData[0].month.split("-").map(Number);

    // Create a map from inputData for quick lookup (by "YYYY-MM")
    const inputMap = new Map();
    inputData.forEach(item => {
        const [y, m] = item.month.split("-");
        const key = `${y}-${m}`;
        inputMap.set(key, (inputMap.get(key) || 0) + item.total); // sum counts if multiple days in month
    });

    // Fill in all 12 months
    for (let month = 1; month <= 12; month++) {
        const monthStr = String(month).padStart(2, "0");
        const key = `${year}-${monthStr}`;

        result.push({
            name: monthStr, // "01" for Jan, "02" for Feb, etc.
            count: inputMap.get(key) || 0
        });
    }

    return result;
};


