import React ,{useId} from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId();
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''></label>}
      <select
      {...props}
      ref={ref}
      id={id}
      className={`w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
            {options?.map((option) => (
                <option key={option} value={option}>
                {option}</option>
            ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
