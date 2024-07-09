import { hotelTypes } from "../config/hotel-option-config";

type Props = {
    selectedType:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
};

const HotelTypeFilter = ({selectedType,onChange}:Props)=>{
    return (
        <div className="border-b border-slate-300 pb-5" >
            <h4 className="text-md font-semibold mb-2" >Hotel Type</h4>
            {hotelTypes.map((type)=>(
                <label className="flex items-center space-x-2">
                    <input 
                    type="checkbox"
                    className="rounded"
                    value={type}
                    checked={selectedType.includes(type)}
                    onChange={onChange}
                    />
                    <span>{type}</span>
                </label>
            ))}
        </div>
    );
};

export default HotelTypeFilter;