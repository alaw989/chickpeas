<template>
  <ul class="flex flex-wrap appetizers">
    <li v-for="(item, i) in items" :key="i">
      <img
          src="/img/plate-1.jpg"
          :alt="item.title"
          class="app-img"
      />
      <div class="app-text">
        <h3>{{ item.title }} — {{ item.price }}</h3>
        <p>{{ item.desc }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const items = [
  {title: 'Chickpeas Sampler', price: '$14.99', desc: 'Kibbe, hummus, stuffed grape leaves, meat pita, and tabbouleh.'},
  {title: 'Falafel', price: '$8.99', desc: 'Ground chickpeas, parsley, cilantro, and spices.'},
  {title: `Za'atar Pita`, price: '$6.99', desc: 'Grilled pita topped with za\'atar, olive oil, tomatoes, and cheese.'},
  {title: 'Beef Sambousek', price: '$9.99', desc: 'Ground beef pastries fried to perfection for maximum flavor.'},
  {
    title: 'Spinach Sambousek',
    price: '$8.99',
    desc: 'Dough filled with spinach, onions, lemon, and a blend of spices.'
  },
  {
    title: 'Stuffed Grape Leaves',
    price: '$8.99',
    desc: 'Grape leaves stuffed with seasoned rice and herbs, served with pita and tzatziki sauce.'
  },
  {
    title: 'Kibbe Rolls (6)',
    price: '$10.99',
    desc: 'Bulgur shells stuffed with ground meat, onions, pine nuts, and served with tzatziki sauce.'
  },
  {
    title: 'Hummus with Pita',
    price: '$7.99',
    desc: 'Chickpea dip blended with tahini, lemon juice, garlic, and spices.'
  },
  {
    title: 'Tabbouleh Salad',
    price: '$7.99',
    desc: 'Chopped parsley, tomatoes, onions, and bulgur wheat tossed with lemon juice and olive oil.'
  },
  {
    title: 'Kafta (3)',
    price: '$12.99',
    desc: 'Spiced ground meat mixed with Mediterranean herbs, served with tzatziki sauce.'
  },
];
</script>

<style scoped>
.appetizers {


  li {
    list-style: none;
    background: #fff;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .app-img {
      width: 80px;
      height: 80px;
      border-radius: 9999px;
      object-fit: cover;
      flex-shrink: 0;
      margin-right: 1rem;
    }

    .app-text {
      text-align: left;

      h3 {
        margin: 0 0 0.5rem;
        font-weight: 700;
        font-size: 1.25rem;
      }

      p {
        font-weight: 100;
        line-height: 1.875;
        margin: 0;
        font-size: 1.125rem;
        color: #474a45;
      }
    }
  }
}



</style>
