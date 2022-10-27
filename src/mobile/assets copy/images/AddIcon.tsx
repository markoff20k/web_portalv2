import * as React from 'react';

interface Props {
	className?: string;
}

export const AddIcon: React.FC<Props> = (props: Props) => (
	<svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={props.className}>
		<rect width="28" height="28" fill="none" />
		<path
			d="M14 23.6C8.708 23.6 4.4 19.292 4.4 14C4.4 8.708 8.708 4.4 14 4.4C19.292 4.4 23.6 8.708 23.6 14C23.6 19.292 19.292 23.6 14 23.6ZM14 2C12.4241 2 10.8637 2.31039 9.4078 2.91345C7.95189 3.5165 6.62902 4.40042 5.51472 5.51472C3.26428 7.76516 2 10.8174 2 14C2 17.1826 3.26428 20.2348 5.51472 22.4853C6.62902 23.5996 7.95189 24.4835 9.4078 25.0866C10.8637 25.6896 12.4241 26 14 26C17.1826 26 20.2348 24.7357 22.4853 22.4853C24.7357 20.2348 26 17.1826 26 14C26 12.4241 25.6896 10.8637 25.0866 9.4078C24.4835 7.95189 23.5996 6.62902 22.4853 5.51472C21.371 4.40042 20.0481 3.5165 18.5922 2.91345C17.1363 2.31039 15.5759 2 14 2ZM15.2 8H12.8V12.8H8V15.2H12.8V20H15.2V15.2H20V12.8H15.2V8Z"
			fill="var(--icons)"
		/>
	</svg>
);
