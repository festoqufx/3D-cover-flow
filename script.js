console.clear();

const slides = [
  {
    title: "Machu Picchu",
    subtitle: "Peru",
    description: "Adventure is never far away",
    image: "https://test-site2-self.vercel.app/web/1.png",
  },

  {
    title: "Chamonix",
    subtitle: "France",
    description: "Let your dreams come true",
    image: "https://test-site2-self.vercel.app/web/2.png",
  },

  {
    title: "Mimisa Rocks",
    subtitle: "Australia",
    description: "A piece of heaven",
    image: "https://test-site2-self.vercel.app/web/3.png",
  },

  {
    title: "Four",
    subtitle: "Australia",
    description: "A piece of heaven",
    image: "https://test-site2-self.vercel.app/web/4.png",
  },

  {
    title: "Five",
    subtitle: "Australia",
    description: "A piece of heaven",
    image: "https://test-site2-self.vercel.app/web/5.png",
  },
];

function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    };
  }
};

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return /*#__PURE__*/ React.createElement(
    "div",
    {
      ref: ref,
      className: "slide",
      "data-active": active,
      style: {
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      },
    } /*#__PURE__*/,

    React.createElement("div", {
      className: "slideBackground",
      style: {
        backgroundImage: `url('${slide.image}')`,
      },
    }) /*#__PURE__*/,

    React.createElement(
      "div",
      {
        className: "slideContent",
        style: {
          backgroundImage: `url('${slide.image}')`,
        },
      } /*#__PURE__*/,

      React.createElement(
        "div",
        { className: "slideContentInner" } /*#__PURE__*/,
        React.createElement(
          "h2",
          { className: "slideTitle" },
          slide.title
        ) /*#__PURE__*/,
        React.createElement(
          "h3",
          { className: "slideSubtitle" },
          slide.subtitle
        ) /*#__PURE__*/,
        React.createElement(
          "p",
          { className: "slideDescription" },
          slide.description
        )
      )
    )
  );
}

function App() {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  return /*#__PURE__*/ React.createElement(
    "div",
    { className: "slides" } /*#__PURE__*/,
    React.createElement(
      "button",
      { onClick: () => dispatch({ type: "PREV" }) },
      "\u2039"
    ),

    [...slides, ...slides, ...slides].map((slide, i) => {
      let offset = slides.length + (state.slideIndex - i);
      return /*#__PURE__*/ React.createElement(Slide, {
        slide: slide,
        offset: offset,
        key: i,
      });
    }) /*#__PURE__*/,
    React.createElement(
      "button",
      { onClick: () => dispatch({ type: "NEXT" }) },
      "\u203A"
    )
  );
}

const elApp = document.getElementById("app");
ReactDOM.render(/*#__PURE__*/ React.createElement(App, null), elApp);
