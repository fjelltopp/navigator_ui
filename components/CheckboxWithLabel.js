import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';


export default function CheckboxWithLabel({ checked, label }) {
    const icon = checked ? faCheckSquare : faSquare;
    const iconClassName = checked ? 'text-success' : 'text-muted';
    return (
        <div className="CheckboxWithLabel">
            <div className="d-table-cell field-with-icon">
                <FontAwesomeIcon icon={icon} className={iconClassName} />
            </div>
            <div className="d-table-cell">{label}</div>
        </div>
    )
}
