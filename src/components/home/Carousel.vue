<template>
  <div id="carouselFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/food1.jpg" class="d-block w-100" alt="/fondecran.png" />
        <div class="carousel-caption text-warning rounded bg-gradient bg-dark d-md-block">
          <h5>Plats à emporté</h5>
          <p>Savourez chaque jour un menu frais et gourmand, prêt à être emporté !</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="/food.jpg" class="d-block w-100" alt="/fondecran.png" />
        <div class="carousel-caption text-warning rounded bg-gradient bg-dark d-md-block">
          <h5>Livraison à domicile</h5>
          <p>Profitez de nos délicieux plats livrés chez vous, sans effort !</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="/food2.jpg" class="d-block w-100" alt="/fondecran.png" />
        <div class="carousel-caption text-warning rounded bg-gradient bg-dark d-md-block">
          <h5>Ėvénementiels</h5>
          <p>Un événement à célébrer ? Offrez à vos convives un festin inoubliable !</p>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselFade"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselFade"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
