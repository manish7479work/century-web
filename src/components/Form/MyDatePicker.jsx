import { DatePicker } from 'antd';

const MyDatePicker = ({ setDateRange = () => { } }) => {
    return (
        <DatePicker.RangePicker
            className="custom-range-picker font-medium text-geeen-100 p-2 rounded-md border-gray-300 hover:border-blue-500 w-full"
            placeholder={["Start Date", "End Date"]}
            onChange={(date, dateString) => {
                setDateRange(dateString);
            }}
        />
    )
}

export default MyDatePicker
