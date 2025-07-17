import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import images from '~/assets/images';

const Image = forwardRef(({ src, alt, fallback: customFallback = images.logo, className }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(images.logo);
    };

    return (
        <img
            ref={ref}
            src={fallback || src}
            alt={alt}
            className={classNames(styles.wrapper, className)}
            onError={handleError}
        />
    );
});

export default Image;
