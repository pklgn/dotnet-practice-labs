function Review() {
    return (
        <div>
            <img className="author-image" alt="author logo"/>
            <div className="review__content">
                <h3 className="review__author"></h3>
                <div className="review__text"></div>
            </div>
            <div className="review__total-grade"></div>
        </div>
    )
}

export default Review;