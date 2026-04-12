import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./NewProductsSlider.module.scss";

import { NewProductCard } from "../../shardes/NewProductCard/NewProductCard";
import { NewProductSkeleton } from "../../shardes/NewProductCard/Skeleton/NewProductSkeleton";

interface Product {
    id: number;
    name: string;
    image: string;
    description: string;
}

const CARD_WIDTH = 220;
const GAP = 8;
const STEP = CARD_WIDTH + GAP;

export const NewProductsSlider = () => {

    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const trackRef = useRef<HTMLDivElement>(null);

    const position = useRef(0);
    const isDragging = useRef(false);
    const lastX = useRef(0);

    const velocity = useRef(0);
    const raf = useRef<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/data/new-products.json");
            const data = await res.json();

            setItems(data.products);
            setLoading(false);

            position.current = data.products.length * STEP;
        };

        fetchData();
    }, []);

    const originalLength = useMemo(() => items.length, [items]);

    useEffect(() => {
        const loop = () => {
            if (trackRef.current) {

                if (!isDragging.current) {
                    position.current += 0.4 + velocity.current;
                    velocity.current *= 0.95;
                }

                const max = originalLength * STEP;

                if (position.current > max * 2) {
                    position.current -= max;
                }

                if (position.current < max) {
                    position.current += max;
                }

                trackRef.current.style.transform =
                    `translate3d(${-position.current}px, 0, 0)`;

                const index = Math.round(position.current / STEP) % originalLength;

                setActiveIndex(
                    (index + originalLength) % originalLength
                );
            }

            raf.current = requestAnimationFrame(loop);
        };

        raf.current = requestAnimationFrame(loop);

        return () => {
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [originalLength]);

    const onPointerDown = (e: React.PointerEvent) => {
        isDragging.current = true;
        lastX.current = e.clientX;
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return;

        const dx = e.clientX - lastX.current;
        lastX.current = e.clientX;

        position.current -= dx;
        velocity.current = -dx * 0.3;
    };

    const onPointerUp = () => {
        isDragging.current = false;
    };

    return (
        <div className={styles.wrapper}>

            <div
                className={styles.viewport}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
            >

                <div className={styles.track} ref={trackRef}>

                    {loading
                        ? [...Array(6)].map((_, i) => (
                            <NewProductSkeleton key={i} />
                        ))
                        : [...items, ...items, ...items].map((item, i) => (
                            <div key={`${item.id}-${i}`} className={styles.slide}>
                                <NewProductCard {...item} />
                            </div>
                        ))
                    }

                </div>

            </div>

            <div className={styles.dots}>
                {items.map((_, i) => (
                    <div
                        key={i}
                        className={`${styles.dot} ${i === activeIndex ? styles.active : ""}`}
                    />
                ))}
            </div>

        </div>
    );
};