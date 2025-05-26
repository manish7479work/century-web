// import { DatePicker } from 'antd';

import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const MyDatePicker = ({ setDateRange = () => { }, disabled = false }) => {
    // Automatically uses the computer's current system date
    const disabledDate = (current) => {
        const today = dayjs(); // gets current date from system
        const startOfCurrentYear = today.startOf('year'); // Jan 1st this year
        const endOfCurrentMonth = today.endOf('month'); // end of current month

        // Disable any date before Jan 1st or after end of current month
        return current < startOfCurrentYear || current > endOfCurrentMonth;
    };
    return (
        <RangePicker
            className="custom-range-picker font-medium text-geeen-100 p-2 rounded-md border-gray-300 hover:border-blue-500 w-full"
            placeholder={["Start Date", "End Date"]}
            onChange={(date, dateString) => {
                setDateRange(dateString);
            }}
            disabledDate={disabledDate}
            disabled={disabled}
        />
    )
}





export default MyDatePicker
