<template>
  <div class="container">
    <div class="piece a-piece"> </div>
     <div class="piece b-piece"></div>
    <div class="piece c-piece"></div>
    <div class="piece d-piece"></div>
    <div v-for="(star, index) in stars" :key="'star-' + index" :style="star.style" class="star"></div>
    <div v-for="(meteor, index) in meteors" :key="'meteor-' + index" :style="meteor.style" class="meteor"></div>
    <div v-for="(planet, index) in planets" :key="'planet-' + index" :style="planet.style" class="planet"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      stars: [],
      meteors: [],
      planets: [],
      minStars: 500, // 最低星星数量
      maxStars: 600, // 最高星星数量
      minMeteors: 3, // 最低流星数量
      maxMeteors: 5, // 最高流星数量
      probability: [0.7, 0.65, 0.5, 0.35, 0.3],
      lastMeteorPosition: null
      
    };
  },
  mounted() {
  this.generateStars();
  this.generateMeteors();
},
  methods: {
    generateStars() {
      // 使用 minStars 和 maxStars 控制星星数量
      const numStars = Math.floor(Math.random() * (this.maxStars - this.minStars + 1)) + this.minStars;
      for (let i = 0; i < numStars; i++) {
        const star = {
          style: {
            top: Math.floor(Math.random() * 100) + "%",
            left: Math.floor(Math.random() * 100) + "%",
            width: Math.floor(Math.random() * 3) + "px",
            height: Math.floor(Math.random() * 3) + "px",
            backgroundColor: this.getRandomColor(),
            zIndex: 1,
          },
          duration: Math.floor(Math.random() * 1000) + 1,
          startTime: Date.now(),
        };
        this.stars.push(star);
        setInterval(() => {
          this.removeStar(star);
        }, star.duration * 1000);
      }
    },
    removeStar(star) {
      const index = this.stars.indexOf(star);
      if (index > -1) {
        this.stars.splice(index, 1);
        setTimeout(() => {
          this.generateStar(star);
        }, 1000);
      }
    },
    generateStar(star) {
      star.style.top = Math.floor(Math.random() * 100) + "%";
      star.style.left = Math.floor(Math.random() * 100) + "%";
      star.duration = Math.floor(Math.random() * 1000) + 1;
      star.startTime = Date.now();
      this.stars.push(star);
      setInterval(() => {
        this.removeStar(star);
      }, star.duration * 1000);
    },
    getRandomNumMeteors() {
    const randomNum = Math.random();
    let probabilitySum = 0;
    for (let i = 0; i < this.probability.length; i++) {
      probabilitySum += this.probability[i];
      if (randomNum <= probabilitySum) {
        return i + 1;
      }
    }
    return this.probability.length;
  },
    generateMeteors() {
    const numMeteors = this.getRandomNumMeteors();
    for (let i = 0; i < numMeteors; i++) {
      this.addMeteor();
    }
  },
  addMeteor() {
    const meteor = {
      style: {
        top: `${Math.floor(Math.random() * 50)}%`,
        left: `${50 + Math.floor(Math.random() * 50)}%`
      },
      duration: Math.floor(Math.random() * 10) + 10,
      startTime: Date.now()
    };
    if (this.lastMeteorPosition !== null) {
  let tries = 0;
  while (this.isSamePosition(meteor.style, this.lastMeteorPosition) && tries < 10) {
    meteor.style.top = `${Math.floor(Math.random() * 50)}%`;
    meteor.style.left = `${50 + Math.floor(Math.random() * 50)}%`;
    tries++;
  }
  if (this.meteors.length >= 10) {
    this.removeMeteor(this.meteors[0]);
    this.removeMeteor(this.meteors[1]);
  }
}
this.lastMeteorPosition = meteor.style;
    this.meteors.push(meteor);
    setTimeout(() => {
      this.removeMeteor(meteor);
    }, meteor.duration * 1000);
  },
  removeMeteor(meteor) {
  const index = this.meteors.indexOf(meteor);
  if (index > -1) {
    this.meteors.splice(index, 1);
    setTimeout(() => {
      this.addMeteor();
    }, 1000);
    if (this.meteors.length < this.maxMeteors) {
      this.addMeteor();
    }
  }
},

  isSamePosition(pos1, pos2) {
    return pos1.top === pos2.top && pos1.left === pos2.left;
  },
generateMeteor() {
  const numMeteors = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < numMeteors; i++) {
    const meteor = {
      style: {
        top: Math.floor(Math.random() * 50) + "%",
        left: 50 + Math.floor(Math.random() * 50) + "%", // 修改生成位置，使其出现在 b_piece 区域
      },
      duration: Math.floor(Math.random() * 10) + 10,
      startTime: Date.now(),
    };
    this.meteors.push(meteor);
    // 使用 setTimeout 确保每个流星在其持续时间后消失
    setTimeout(() => {
      this.removeMeteor(meteor);
    }, meteor.duration * 1000);
  }
},
    generatePlanets() {
    const numPlanets = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < numPlanets; i++) {
      const planet = {
        style: {
          top: Math.floor(Math.random() * 100) + "%",
          left: Math.floor(Math.random() * 100) + "%",
          backgroundColor: this.getRandomColor(),
        },
        duration: Math.floor(Math.random() * 2000) + 1,
        startTime: Date.now(),
      };
      this.planets.push(planet);
      setInterval(() => {
        this.removePlanet(planet);
      }, planet.duration * 1000);
    }
  },
    removePlanet(planet) {
      const index = this.planets.indexOf(planet);
      if (index > -1) {
        this.planets.splice(index, 1);
        setTimeout(() => {
          this.generatePlanet(planet);
        }, 1000);
      }
    },
    generatePlanet(planet) {
      planet.style.top = Math.floor(Math.random() * 100) + "%";
      planet.style.left = Math.floor(Math.random() * 100) + "%";
      planet.duration = Math.floor(Math.random() * 2000) + 1;
      planet.startTime = Date.now();
      this.planets.push(planet);
      setInterval(() => {
        this.removePlanet(planet);
      }, planet.duration * 1000);
    },
    getRandomColor() {
      const colors = ["#FFFFFF", "#FFD700", "#FFA500", "#00FFFF", "#FF69B4", "#00BFFF", "#FF1493", "#7FFF00"];
      return colors[Math.floor(Math.random() * colors.length)];
    },
  },
};
</script>


<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
}
.piece {
  width: 50%;
  height: 50%;
  position: relative;
}
.a-piece {
  background-color: #000;
}
.b-piece {
  background-color: #000;
}
.c-piece {
  background-color: #000;
}
.d-piece {
  background-color: #000;
}
.star {
  position: absolute;
  border-radius: 50%;
  animation: twinkling 1s infinite;
}
.meteor {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #FFF;
  animation: meteor 2s ease-in-out infinite;
}
.planet {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #FFF;
  animation: planet 2s infinite;
}
.ring {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #FFF;
}
@keyframes twinkling {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes meteor {
  0% {
    transform: translateX(0) translateY(0);
  }
  100% {
    transform: translateX(-100vw) translateY(100vh); /*修改方向，使流星从 b_piece 区域沿着正确的方向移动*/
  }
}
@keyframes planet {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes ring {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
