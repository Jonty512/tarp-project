import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Slider,
  Typography,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
  Divider,
  Grid,
  Paper,
} from "@material-ui/core";
import {
  makeStyles,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { getConfig, setConfig } from "./util/config";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    backgroundColor: "#f3f3f3",
  },
  grid: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  logo: {
    width: 40,
  },
  center: {
    textAlign: "center",
  },
  width100: {
    width: "100%",
  },
  logoFont: {
    fontFamily: "'Pacifico', cursive",
    marginTop: "-4px",
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const useStylesSlider = makeStyles({
  root: (props: any) => ({
    color: props.color,
    height: 8,
    width: "95%",
  }),
});

function getColor(value: number | number[]) {
  let color = "";
  switch (value) {
    case 33.333: {
      color = "#fc7d1a";
      break;
    }

    case 66.666: {
      color = "#ffc30b";
      break;
    }

    case 99.999: {
      color = "#97bc62";
      break;
    }

    default: {
      color = "red";
      break;
    }
  }

  return color;
}

function getInfo(value: number | number[]) {
  let info = "";
  switch (value) {
    case 33.333: {
      info = "low";
      break;
    }

    case 66.666: {
      info = "moderate";
      break;
    }

    case 99.999: {
      info = "high";
      break;
    }

    default: {
      info = "off";
      break;
    }
  }

  return info;
}

const StyledSlider = withStyles({
  root: {
    color: "#97bc62",
    height: 8,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -6,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(({ classes, ...props }: any) => {
  const customProps = {
    color: getColor(props.value),
  };

  const customClasses = useStylesSlider(customProps);
  return (
    <Slider
      classes={{
        ...classes,
        root: customClasses.root,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
});

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 2,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 2,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#97bc62",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#97bc62",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 23,
    height: 23,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }: any) => (
  <Switch
    focusVisibleClassName={classes.focusVisible}
    disableRipple
    classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));

// const Circle = ({ color }: { color: string }) => (
//   <div style={{
//     padding: 5,
//     marginTop: 6,
//     display: 'inline-block',
//     backgroundColor: color,
//     borderRadius: '50%',
//     width: 2,
//     height: 2,
//   }}
//   />
// );

const theme = createMuiTheme({
  typography: {
    fontSize: 13,
    fontFamily: "'IBM Plex Sans', sans-serif",
  },
});

const Popup = () => {
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState<number | number[]>(66.666);
  const [filters, setFilters] = useState<{
    text: boolean;
    images: boolean;
    videos: boolean;
  }>({
    text: true,
    images: true,
    videos: true,
  });

  const sliderOnChange = (event: object, value: number | number[]) => {
    if (sliderValue !== value) {
      setConfig({ level: value });
    }
    setSliderValue(value);
  };

  const filtersOnChange = (event: {
    target: { name: string; checked: boolean };
  }) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
    setConfig({ [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    const setFromStorage = async () => {
      const items = await getConfig();
      const { text, images, videos, level } = items;
      setFilters({
        text,
        images,
        videos,
      });
      setSliderValue(level);
    };

    setFromStorage();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          spacing={1}
          className={classes.grid}
        >
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <img src="/icon.png" alt="" className={classes.logo} />
              </Grid>
              <Grid item>
                <Typography variant="h5" className={classes.logoFont}>
                  Blurrer
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} />

          <Grid item xs={12}>
            <Typography gutterBottom>
              Choose how you want your content filtered.
            </Typography>
            <Grid container justify="center" alignItems="center">
              <StyledSlider
                value={sliderValue}
                onChange={sliderOnChange}
                step={33.333}
                max={99.999}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Paper
              className={classes.paper}
              elevation={3}
              style={{
                border: `2px solid ${getColor(sliderValue)}`,
              }}
            >
              <Typography>
                This level represents {getInfo(sliderValue)}.
              </Typography>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              margin: 3,
            }}
          >
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>
              What kind of content do you want to filter?
            </Typography>

            <FormControl component="fieldset" className={classes.width100}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <StyledSwitch
                      checked={filters.text}
                      onChange={filtersOnChange}
                      name="text"
                    />
                  }
                  label="Text"
                />
                <FormControlLabel
                  control={
                    <StyledSwitch
                      checked={filters.images}
                      onChange={filtersOnChange}
                      name="images"
                    />
                  }
                  label="Images"
                />
                {/* <FormControlLabel
                  control={<StyledSwitch checked={filters.videos} onChange={filtersOnChange} name="videos" />}
                  label="Videos"
                /> */}
              </FormGroup>
              {/* <FormHelperText className={classes.center}>
                Built with
                {' '}
                <span style={{ color: 'red' }}>♥</span>
                {' '}
                by Team Jalapeno
              </FormHelperText> */}
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
