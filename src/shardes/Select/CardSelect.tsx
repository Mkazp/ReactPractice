interface Option {
    value: string;
    name: string;
}

interface CardSelectProps {
    options: Option[];
    defaultValue: string;
    value?: string;
    onChange: (value: string) => void;
}

const CardSelect = ({options, defaultValue, value, onChange}: CardSelectProps) => {
     return(
        <select value={value} onChange={e => onChange(e.target.value)}>
            <option value="">{defaultValue}</option>
            {options.map(option => 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
     );
};

export default CardSelect;