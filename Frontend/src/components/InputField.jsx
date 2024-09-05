const InputField = ({ label, type = "text", name, value, onChange, colSpan }) => {
    return (
      <div className={`col-span-6 sm:col-span-${colSpan}`}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 w-full rounded-md border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>
    );
  };
  
  export default InputField;
  