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

    const getDateParts = (record) => {
        const dateStr = record.query_timestamp ?? record.month;
        const [y, m] = dateStr.split("T")[0].split("-");
        return [parseInt(y), parseInt(m)];
    };

    const [year, month] = getDateParts(inputData[0]);
    const daysInMonth = new Date(year, month, 0).getDate();

    const dateCountMap = new Map(
        inputData.map(item => {
            const date = (item?.query_timestamp ?? item?.month).split("T")[0];
            return [date, item.count ?? item.total];
        })
    );

    console.log(dateCountMap)

    for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = String(day).padStart(2, "0");
        const monthStr = String(month).padStart(2, "0");
        const currentDateStr = `${year}-${monthStr}-${dayStr}`;

        result.push({
            name: dayStr, // or use currentDateStr if needed
            count: dateCountMap.get(currentDateStr) || 0
        });
    }

    return result;
};


// export const fillMonthlyData = (inputData = []) => {
//     const result = [];

//     if (inputData.length === 0) return result;

//     // Extract year and month from the first input record
//     const [year, month] = inputData[0].query_timestamp.split("-").map(Number);
//     const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-indexed here

//     // Create a map from inputData for quick lookup
//     const inputMap = new Map(
//         inputData.map(item => [item.query_timestamp.split("T")[0], item.count])
//     );

//     // Fill in the full month
//     for (let day = 1; day <= daysInMonth; day++) {
//         const dayStr = String(day).padStart(2, "0");
//         const monthStr = String(month).padStart(2, "0");
//         const formatted = `${year}-${monthStr}-${dayStr}`;

//         result.push({
//             // name: formatted,
//             name: dayStr, // uncomment if you only want day number
//             count: inputMap.get(formatted) || 0
//         });
//     }

//     return result;
// };

export const fillYearlyData = (inputData = []) => {
    const result = [];
    if (inputData.length === 0) return result;

    // Helper function to extract year-month from available fields
    const extractYearMonth = (item) => {
        if (item.month) {
            const [year, month] = item.month.split("-").map(Number);
            return { year, month };
        } else if (item.query_timestamp) {
            const date = new Date(item.query_timestamp);
            return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 }; // Month is 0-based
        }
        return null;
    };

    // Use the first valid item's year to generate months
    const firstValid = inputData.find(item => item.month || item.query_timestamp);
    if (!firstValid) return result;

    const { year } = extractYearMonth(firstValid);

    // Aggregate totals by "YYYY-MM"
    const inputMap = new Map();
    inputData.forEach(item => {
        const ym = extractYearMonth(item);
        if (!ym) return;

        const monthStr = String(ym.month).padStart(2, "0");
        const key = `${ym.year}-${monthStr}`;

        inputMap.set(key, (inputMap.get(key) || 0) + item.total);
    });

    // Fill all 12 months of the detected year
    for (let m = 1; m <= 12; m++) {
        const monthStr = String(m).padStart(2, "0");
        const key = `${year}-${monthStr}`;
        result.push({
            name: monthStr,
            count: inputMap.get(key) || 0
        });
    }

    return result;
};


// export const fillYearlyData = (inputData = []) => {
//     const result = [];

//     if (inputData.length === 0) return result;

//     // Extract year from the first input record
//     const [year] = inputData[0].month.split("-").map(Number);

//     // Create a map from inputData for quick lookup (by "YYYY-MM")
//     const inputMap = new Map();
//     inputData.forEach(item => {
//         const [y, m] = item.month.split("-");
//         const key = `${y}-${m}`;
//         inputMap.set(key, (inputMap.get(key) || 0) + item.total); // sum counts if multiple days in month
//     });

//     // Fill in all 12 months
//     for (let month = 1; month <= 12; month++) {
//         const monthStr = String(month).padStart(2, "0");
//         const key = `${year}-${monthStr}`;

//         result.push({
//             name: monthStr, // "01" for Jan, "02" for Feb, etc.
//             count: inputMap.get(key) || 0
//         });
//     }

//     return result;
// };

export function getMonthsToJanuary() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentMonth = new Date().getMonth(); // 0-based index
    const months = [];

    for (let i = currentMonth; i >= 0; i--) {
        months.push({
            month: monthNames[i],
            number: i + 1
        });
    }

    return months;
}

export function isDateRangeWithInTheTarget(startDate, endDate, target) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Get time difference in milliseconds
    const timeDiff = end - start;

    // Convert to days
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    return dayDiff <= target;
}

export function getDaysInCurrentMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}



// export function getMonthDateRange(month) {
//     if (!month) return
//     const year = new Date().getFullYear(); // Use current year

//     // JS month is 0-based: Jan = 0, so subtract 1
//     const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
//     const endDate = new Date(Date.UTC(year, month, 1, 0, 0, 0)); // First day of next month

//     return {
//         start_date: startDate.toISOString(),
//         end_date: endDate.toISOString()
//     };
// }

export function getMonthDateRange(month) {
    const year = new Date().getFullYear();

    // Ensure the input is a valid number between 1 and 12
    if (!Number.isInteger(month) || month < 1 || month > 12) {
        throw new Error("Month must be an integer between 1 and 12");
    }

    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, 1, 0, 0, 0)); // First day of next month

    return {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
    };
}

