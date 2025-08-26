module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SF Pro Text"', "system-ui", "sans-serif"],
      },
      colors: {
        "accent-9": "var(--accent-9)",
        "accent-10": "var(--accent-10)",
        "accent-12": "var(--accent-12)",
        "accent-1": "var(--accent-1)",
        "accent-11": "var(--accent-11)",
        "accent-8": "var(--accent-8)",
        "accent-7": "var(--accent-7)",
        "accent-6": "var(--accent-6)",
        "accent-5": "var(--accent-5)",
        "accent-4": "var(--accent-4)",
        "accent-3": "var(--accent-3)",
        "accent-2": "var(--accent-2)",
        random: {
          1: "#FF5733", // Ярко-оранжевый
          2: "#33FF57", // Неоново-зеленый
          3: "#3357FF", // Ярко-синий
          4: "#FF33F5", // Фуксия
          5: "#33FFF5", // Бирюзовый
          6: "#F5FF33", // Лимонный
          7: "#8A33FF", // Фиолетовый
          8: "#FF8A33", // Оранжевый
          9: "#33FF8A", // Мятный
          10: "#FF338A", // Розовый
          11: "#33A2FF", // Голубой
          12: "#A2FF33", // Лаймовый
          13: "#FF33A2", // Малиновый
          14: "#33FFA2", // Аквамарин
          15: "#FF5733", // Коралловый
          16: "#6A33FF", // Пурпурный
          17: "#33FF6A", // Изумрудный
          18: "#FF6A33", // Тыквенный
          19: "#33D1FF", // Небесно-голубой
          20: "#D133FF", // Лавандовый
        },
      },
    },
  },

  plugins: [],
};
