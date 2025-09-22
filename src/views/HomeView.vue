<template>
  <div class="home-view">
    <div class="text">
      <p>So, you want to travel to</p>
      <h1>Space</h1>
      <p>
        Let's dace it; if you want to go to space, you might as well genuinely go to outer space and
        not hover kind of on the edge of it. Well sit back, and relax because we'll give you a truly
        out of this world experiencie!
      </p>
    </div>
    <div class="explore"><button>EXPLORE</button></div>
  </div>
</template>
<script setup></script>
<style scoped>
.home-view {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: px;
  margin-bottom: 120px;
  background-image: url(home/background-home-desktop.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.text {
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  width: 60%;
  font-size: 1.5em;
}

.text h1 {
  font-size: 4em;
  margin-top: 0;
}
.text p {
  width: 80%;
}

.explore {
  margin-top: 100px;
}

.explore button {
  background-color: white;
  color: black;
  border: none;
  padding: 90px 50px;
  font-size: 2.2em;
  cursor: pointer;
  border-radius: 100%;
  font-weight: bold;
}

@media (max-width: 768px) {
  .home-view {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }
  .text {
    width: 100%;
    text-align: center;
  }
  .text h1 {
    font-size: 4em;
  }
  .text p {
    width: 90%;
    font-size: 1.8em;
  }
  .explore button {
    padding: 110px 75px;
    font-size: 2em;
  }
}
</style>
