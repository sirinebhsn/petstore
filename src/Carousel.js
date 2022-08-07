import { Carousel } from 'react-bootstrap';

export default function Carou(){
    return(
        <Carousel>
        <div className="carousel-item active" data-bs-interval="10000">
        <img src='https://s3-eu-west-1.amazonaws.com/askremax/856/6ba9d703-50b6-2c18-d850-1e22e8315388.png' style={{width:1300, height:500}} className="d-block w-100" alt="pic"/>
    
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="https://www.aquariadise.com/wp-content/uploads/2020/04/rosy-barb-at-the-bottom-of-aquarium.jpg"style={{width:1300, height:500}}  className="d-block w-100" alt="..."/>
</div>
    </Carousel>
    )
}