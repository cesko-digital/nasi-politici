import React, { useState } from 'react';
import ReactSelect, {
	components,
	Props as RSProps,
	ValueType,
} from 'react-select';
import { useController, Control } from 'react-hook-form';

import { ReactComponent as DropArrow } from 'images/drop-arrow.svg';

import './Select.scss';

const DropdownIndicator = (props: any) => (
	<components.DropdownIndicator {...props}>
		<DropArrow />
	</components.DropdownIndicator>
);

interface Props {
	control: Control;
	name: string;
	defaultValue?: string | null;
}

const Select: React.FC<Props & RSProps> = ({
	control,
	name,
	defaultValue = null,
	...restProps
}) => {
	const [value, setValue] = useState<ValueType<any, false> | null>(
		defaultValue,
	);
	const {
		field: { ref, onChange, ...inputProps },
	} = useController({
		name,
		control,
		defaultValue,
	});

	return (
		<ReactSelect
			{...inputProps}
			{...restProps}
			onChange={(valueType) => {
				onChange(valueType?.value);
				setValue(valueType);
			}}
			value={value}
			ref={ref}
			components={{ DropdownIndicator }}
			classNamePrefix="grohe-select"
			styles={{
				control: (provided) => {
					const modified = provided;
					delete modified.borderColor;
					return {
						...modified,
						'&:hover': {},
					};
				},
				indicatorSeparator: () => ({}),
				menu: () => ({}),
				option: () => ({}),
				dropdownIndicator: () => ({}),
				valueContainer: () => ({}),
				input: () => ({}),
			}}
		/>
	);
};

export default Select;
