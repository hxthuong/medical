import classNames from 'classnames';
import styles from './Table.module.scss';

function TableColumn({ className, width, data }) {
    return (
        <td width={width} className={classNames(styles.wrapper, className)}>
            {data}
        </td>
    );
}

export default TableColumn;
