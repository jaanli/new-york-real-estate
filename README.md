# New York Real Estate

![New York Real Estate Map Demo](./new_york_real_estate_map_demo.gif)

## Demo Notebooks

- Parsing the entirety of the 3.9 million rows and 21 columns of the Department of Buildings Permit Issuance dataset from NYC Open Data:
  - in the `notebooks` directory: https://github.com/jaanli/new-york-real-estate/blob/main/notebooks/nyc.gov_department_of_buildings_permit_issuance_data_processing.ipynb or:
<a target="_blank" href="https://colab.research.google.com/github/jaanli/new-york-real-estate/blob/main/notebooks/nyc.gov_department_of_buildings_permit_issuance_data_processing.ipynb">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

## Getting started

This is an [Observable Framework](https://observablehq.com/framework) project. To start the local preview server, run:

```
yarn dev
```

Then visit <http://localhost:3000> to preview your project.

For more, see <https://observablehq.com/framework/getting-started>.

## Project structure

A typical Framework project looks like this:

```ini
.
├─ docs
│  ├─ components
│  │  └─ timeline.js           # an importable module
│  ├─ data
│  │  ├─ launches.csv.js       # a data loader
│  │  └─ events.json           # a static data file
│  ├─ example-dashboard.md     # a page
│  ├─ example-report.md        # another page
│  └─ index.md                 # the home page
├─ .gitignore
├─ observablehq.config.js      # the project config file
├─ package.json
└─ README.md
```

**`docs`** - This is the “source root” — where your source files live. Pages go here. Each page is a Markdown file. Observable Framework uses [file-based routing](https://observablehq.com/framework/routing), which means that the name of the file controls where the page is served. You can create as many pages as you like. Use folders to organize your pages.

**`docs/index.md`** - This is the home page for your site. You can have as many additional pages as you’d like, but you should always have a home page, too.

**`docs/data`** - You can put [data loaders](https://observablehq.com/framework/loaders) or static data files anywhere in your source root, but we recommend putting them here.

**`docs/components`** - You can put shared [JavaScript modules](https://observablehq.com/framework/javascript/imports) anywhere in your source root, but we recommend putting them here. This helps you pull code out of Markdown files and into JavaScript modules, making it easier to reuse code across pages, write tests and run linters, and even share code with vanilla web applications.

**`observablehq.config.js`** - This is the [project configuration](https://observablehq.com/framework/config) file, such as the pages and sections in the sidebar navigation, and the project’s title.

## Command reference

| Command           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `yarn install`            | Install or reinstall dependencies                        |
| `yarn dev`        | Start local preview server                               |
| `yarn build`      | Build your static site, generating `./dist`              |
| `yarn deploy`     | Deploy your project to Observable                        |
| `yarn clean`      | Clear the local data loader cache                        |
| `yarn observable` | Run commands like `observable help`                      |

## Data Build Tool (dbt) for processing New York City real estate and property data

This project uses [dbt](https://www.getdbt.com/) to process New York City real estate and property data. The dbt project is located in the `data_processing` directory and was initialized using the following command:

```bash
dbt init data_processing
```

## Making a GIF

To make a GIF of your project, use Quicktime Player on Mac to record the screen, then save the `.mov` file somewhere and run:

```bash
# trim
ffmpeg -ss 00:00:02 -to 00:00:08 -i recording3.mov -c copy trimmed_recording.mov
# speed up
ffmpeg -i trimmed_recording.mov -filter:v "setpts=PTS/5,fps=24" -an sped.mov
# make gif
ffmpeg -i sped.mov -vf "fps=20,scale=1080:-1:flags=lanczos,palettegen=stats_mode=diff" -y palette.png
ffmpeg -i sped.mov -i palette.png -filter_complex "fps=20,scale=1080:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" -y high_quality.gif
```