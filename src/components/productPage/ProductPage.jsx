import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './ProductPage.css'; 

const CommentCard = ({ username, comment, avatarUrl }) => (
  <div className="comment-card">
    <div className="comment-user">
      <img className="user-avatar" src={avatarUrl} alt={username} />
      <span className="username">{username}</span>
    </div>
    <p className="comment">{comment}</p>
  </div>
);

const ProductPage = () => {
  const [rating, setRating] = useState(4.7);
  const [numReviews, setNumReviews] = useState(150);

  const handleMouseOver = (value) => {
    setRating(value);
  };

  // Datos de ejemplo para comentarios
  const comments = [
    {
      username: 'Usuario1',
      comment: '¡Este producto es increíble! Lo recomiendo totalmente.',
      avatarUrl: '',
    },
    {
      username: 'Usuario2',
      comment: 'Buen producto, aunque podría ser un poco más económico.',
      avatarUrl: '',
    },
    {
        username: 'Usuario3',
        comment: '    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis id esse amet illum tempora eveniet nobis voluptatem dicta, maiores reprehenderit magni consequuntur nulla aut dolor? Eligendi rerum libero neque iste impedit officiis dolorum, labore qui, ut odit itaque ducimus. Quidem tenetur animi doloremque vitae enim aliquam et facere id illum.',
        avatarUrl: '',
      },
      {
        username: 'Usuario4',
        comment: '    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime voluptatem atque quidem similique tenetur quos, error suscipit laborum accusantium repellat!',
        avatarUrl: '',
      },
    // Agrega más comentarios aquí
  ];

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image">
          {/* <img src={require('../../img/bicicleta.jpg')} alt="Producto" /> */}
          <img src={require('../../img/bicicleta.jpg')} alt="Producto" />
        </div>
        <div className="product-details">
          <h2>Nombre del Producto</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
            iste, rem laboriosam alias fuga maiores esse officiis eius modi
            asperiores ipsam possimus iure odit ea quia impedit? Nobis,
            accusantium illo. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ex, nisi. Id mollitia molestias omnis
            reprehenderit architecto, quo voluptate rerum pariatur. Distinctio
            possimus nisi at necessitatibus veniam sapiente est excepturi eaque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ad
            assumenda error eos nulla sed sint asperiores, similique incidunt
            dolores saepe tempore minus ratione ullam odit! Iusto et numquam
            nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            vitae facere laborum, eum iste fugiat ex dolorum corrupti quis
            nulla quidem consequatur cupiditate, ducimus reprehenderit
            perspiciatis magnam nesciunt voluptas! Magnam.
          </p>
          
          <div className="product-rating">
            <span className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label
                    key={index}
                    onMouseOver={() => handleMouseOver(ratingValue)}
                  >
                    <FaStar
                      className="star"
                      color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                    />
                  </label>
                );
              })}
            </span>
            <span className="rating-value">{rating.toFixed(1)}</span>
            <span className="num-reviews">{numReviews} reseñas</span>
          </div>
          <button className="buy-button">Comprar</button>
        </div>
        
      </div>
      <div className="comments-container">
        <h3>Comentarios</h3>
        <div className="comments-grid">
          {comments.map((comment, index) => (
            <CommentCard
              key={index}
              username={comment.username}
              comment={comment.comment}
              avatarUrl={comment.avatarUrl}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ProductPage;