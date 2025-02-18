import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import classNames from 'classnames';
import { API_URL } from '../../../../constants/config';
import { Link } from 'react-router-dom';

const SlideShow = ({ slides }) => {  
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [dragStartTime, setDragStartTime] = useState(0);
    const slideContainerRef = useRef(null);
    const [slideWidth, setSlideWidth] = useState(0);
    const isResizing = useRef(false);
    const [isClick, setIsClick] = useState(false);

    const clonedSlides = slides ? [slides[slides.length -1], ...slides, slides[0]] : [];

    const indexSlideLast = clonedSlides.length - 2;

    useEffect(() => {
        isResizing.current = true;
        setSlideWidth(slideContainerRef.current.clientWidth);
        setCurrentTranslate(-slideContainerRef.current.clientWidth * currentSlide);
        setPrevTranslate(-slideContainerRef.current.clientWidth * currentSlide);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (slideContainerRef.current) {
                isResizing.current = true;
                setSlideWidth(slideContainerRef.current.clientWidth);
                setCurrentTranslate(-slideContainerRef.current.clientWidth * currentSlide);
                setPrevTranslate(-slideContainerRef.current.clientWidth * currentSlide);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentSlide]);

    const startDrag = (e) => {
        if (e.type === "mousedown") {
            e.preventDefault();
        }

        setIsDragging(true);
        const position = getPositionX(e);
        setStartPos(position);
        setPrevTranslate(currentTranslate);
        setDragStartTime(Date.now());
    }

    const onDrag = (e) => {
        if (!isDragging) return; 
        
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPos;

        if (currentTranslate === 0 && prevTranslate === 0) {
            if (diff > 0) {
                setPrevTranslate(-indexSlideLast * slideWidth);
                setCurrentTranslate(-indexSlideLast * slideWidth + diff);
                setCurrentSlide(indexSlideLast);
            }
        } else if (currentSlide === clonedSlides.length - 1 && prevTranslate === - (clonedSlides.length - 1) * slideWidth) {
            if (diff < 0) {
                setPrevTranslate(-slideWidth);
                setCurrentTranslate(diff);
                setCurrentSlide(1);
            }
        }

        setCurrentTranslate(prevTranslate + diff);
    }

    const endDrag = (e) => {
        setIsDragging(false);
        isResizing.current = false;

        const movedBy = currentTranslate - prevTranslate;

        const threshold = slideWidth * 0.2;
        const dragDuration = Date.now() - dragStartTime;

        let newSlide = currentSlide;
        const dragSpeed = Math.abs(movedBy / dragDuration);

        if (dragSpeed > 0.5) {
            if (movedBy < -30) {
                newSlide = currentSlide + 1;
            } else if (movedBy > 30 && currentSlide > 0) {
                newSlide = currentSlide - 1;
            }
        } else {
            if (movedBy < -threshold && currentSlide < clonedSlides.length - 1) {
                newSlide = currentSlide + 1;
            } else if (movedBy > threshold && currentSlide > 0) {
                newSlide = currentSlide - 1;
            }
        }

        setCurrentSlide(newSlide);
        setCurrentTranslate(-newSlide * slideWidth);
        setPrevTranslate(-newSlide * slideWidth);

        if (Math.abs(movedBy) > 5) {
            setIsClick(false);
        } else {
            setIsClick(true);
        }
    }

    const getPositionX = (e) => {
        return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    };

    const handleMoveToSlide = (indexSlide) => {
        setIsDragging(false);
        setCurrentSlide(indexSlide);

        console.log(indexSlide);

        setCurrentTranslate(-slideWidth * indexSlide);
        setPrevTranslate(-slideWidth * indexSlide);
    }   

    const style = {
        transform: `translateX(${currentTranslate}px)`,
        transition: isDragging || isResizing.current ? 'none' : 'transform 0.3s',
    };

    const handleLinkClick = (e) => {
        if (!isClick) {
            e.preventDefault();
        }
    };

    return (
      <div className="slide-container"
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={startDrag}
            onTouchMove={onDrag}
            onTouchEnd={endDrag}
            ref={slideContainerRef}
      >    
          <div className="slide-wrapper" style={style}>                    
              {clonedSlides.map((slide, index) => {
                    const realIndex = (index - 1 + (clonedSlides.length - 2)) % (clonedSlides.length - 2);   
                    return (
                        <div 
                            key={index}
                            className={`slide ${currentSlide === index ? 'active' : ''}`}
                            aria-label={`${realIndex + 1} / ${clonedSlides.length - 2}`}
                            data-index={`${index}`}
                        >
                            <Link to={slide?.target} onClick={(e) => handleLinkClick(e)}>
                                <img src={`${API_URL}/storage/${slide?.path}`} alt="" />
                            </Link>
                        </div>
                    );
            })}
          </div>

          <div className="slide-indicators">
              { slides && slides.map((slide, index) => (
                    <span
                        key={index}
                        className={classNames(
                            'indicator', { 
                                'active': currentSlide === index + 1 || 
                                        (currentSlide === 0 && index === slides.length - 1) || 
                                        (currentSlide === slides.length + 1 && index === 0)
                        })} 
                        onClick={() => handleMoveToSlide(index + 1)}                 
                    > 
                  </span>
              ))}
          </div>
      </div>
    );
}

export default SlideShow;
