exports.seed = async function(knex) {
  await knex('season_data').del();

  const rows = [
    {
      key: 'madness-prize-pools',
      data: [
        { season: 2008, prize_pool: 660 }, { season: 2009, prize_pool: 1134 }, { season: 2010, prize_pool: 1510 },
        { season: 2011, prize_pool: 1680 }, { season: 2012, prize_pool: 2110 }, { season: 2013, prize_pool: 3540 },
        { season: 2014, prize_pool: 5423 }, { season: 2015, prize_pool: 6511 }, { season: 2016, prize_pool: 6675 },
        { season: 2017, prize_pool: 8787 }, { season: 2018, prize_pool: 9792 }, { season: 2019, prize_pool: 12200 },
        { season: 2021, prize_pool: 11280 }, { season: 2022, prize_pool: 11685 }, { season: 2023, prize_pool: 12768 },
        { season: 2024, prize_pool: 12790 }
      ]
    },
    {
      key: 'confidence-prize-pools',
      data: [
        { season: 2009, prize_pool: 675 }, { season: 2010, prize_pool: 810 }, { season: 2011, prize_pool: 780 },
        { season: 2012, prize_pool: 930 }, { season: 2013, prize_pool: 1120 }, { season: 2014, prize_pool: 890 },
        { season: 2015, prize_pool: 1840 }, { season: 2016, prize_pool: 2430 }, { season: 2017, prize_pool: 1690 },
        { season: 2018, prize_pool: 1790 }, { season: 2019, prize_pool: 1650 }, { season: 2020, prize_pool: 1460 },
        { season: 2021, prize_pool: 2130 }, { season: 2022, prize_pool: 3140 }, { season: 2023, prize_pool: 3915 },
        { season: 2024, prize_pool: 3205 }
      ]
    },
    {
      key: 'ncaa-pickem-prize-pools',
      data: [
        { season: 2008, prize_pool: 550 }, { season: 2009, prize_pool: 1170 }, { season: 2010, prize_pool: 1050 },
        { season: 2011, prize_pool: 1080 }, { season: 2012, prize_pool: 1080 }, { season: 2013, prize_pool: 1090 },
        { season: 2014, prize_pool: 1150 }, { season: 2015, prize_pool: 1550 }, { season: 2016, prize_pool: 1650 },
        { season: 2017, prize_pool: 1970 }, { season: 2018, prize_pool: 1760 }, { season: 2019, prize_pool: 2224 },
        { season: 2020, prize_pool: 1110 }, { season: 2021, prize_pool: 1870 }, { season: 2022, prize_pool: 2880 },
        { season: 2023, prize_pool: 3542 }, { season: 2024, prize_pool: 3823 }
      ]
    },
    {
      key: 'btb-prize-pools',
      data: [
        { season: 2014, prize_pool: 1620 }, { season: 2015, prize_pool: 3600 }, { season: 2016, prize_pool: 5100 },
        { season: 2017, prize_pool: 4890 }, { season: 2018, prize_pool: 5580 }, { season: 2019, prize_pool: 6634 },
        { season: 2020, prize_pool: 8330 }, { season: 2021, prize_pool: 8921 }, { season: 2022, prize_pool: 12682 },
        { season: 2023, prize_pool: 11551 }, { season: 2024, prize_pool: 10412 }
      ]
    },
    {
      key: 'calcutta-prize-pools',
      data: [
        { season: "'18 March Madness", prize_pool: 3243 }, { season: "'18 Masters", prize_pool: 2735 },
        { season: "'18 NBA Playoffs", prize_pool: 2228 }, { season: "'18 World Cup", prize_pool: 2958 },
        { season: "'18 NCAA Football", prize_pool: 2867 }, { season: "'18 NFL", prize_pool: 1930 },
        { season: "'19 March Madness [SEL]", prize_pool: 3840 }, { season: "'19 March Madness [PUB]", prize_pool: 4323 },
        { season: "'19 Masters", prize_pool: 1753 }, { season: "'19 US Open", prize_pool: 1557 },
        { season: "'19 NFL", prize_pool: 1877 }, { season: "'20 Masters", prize_pool: 2493 },
        { season: "'21 March Madness", prize_pool: 6348 }, { season: "'21 Masters", prize_pool: 3736 },
        { season: "'21 PGA Champ", prize_pool: 3637 }, { season: "'21 US Open", prize_pool: 3326 },
        { season: "'21 British Open", prize_pool: 3675 }, { season: "'21 NFL", prize_pool: 4584 },
        { season: "'22 March Madness", prize_pool: 11714 }, { season: "'22 Masters", prize_pool: 7404 },
        { season: "'22 World Cup", prize_pool: 3309 }, { season: "'22 NFL", prize_pool: 3611 },
        { season: "'23 March Madness", prize_pool: 24884 }, { season: "'23 Masters", prize_pool: 10387 },
        { season: "'23 NFL", prize_pool: 10269 }, { season: "'24 March Madness", prize_pool: 36137 },
        { season: "'24 Masters", prize_pool: 15278 }, { season: "'24 NFL", prize_pool: 9111 }
      ]
    },
    {
      key: 'survivor-series-prize-pools',
      data: [{ season: 2019, prize_pool: 3686 }]
    },
    {
      key: 'survivor-prize-pools',
      data: [
        { season: 2008, prize_pool: 1155 }, { season: 2009, prize_pool: 1870 }, { season: 2010, prize_pool: 1870 },
        { season: 2011, prize_pool: 2750 }, { season: 2012, prize_pool: 3905 }, { season: 2013, prize_pool: 4180 },
        { season: 2014, prize_pool: 4620 }, { season: 2015, prize_pool: 4950 }, { season: 2016, prize_pool: 3880 },
        { season: 2017, prize_pool: 3800 }, { season: 2018, prize_pool: 4275 }, { season: 2019, prize_pool: 3960 },
        { season: 2020, prize_pool: 4275 }, { season: 2021, prize_pool: 5550 }, { season: 2022, prize_pool: 5910 },
        { season: 2023, prize_pool: 6615 }, { season: 2024, prize_pool: 8146 }
      ]
    },
    {
      key: 'bowl-pickem-prize-pools',
      data: [
        { season: 2009, prize_pool: 100 }, { season: 2010, prize_pool: 110 }, { season: 2012, prize_pool: 165 },
        { season: 2013, prize_pool: 320 }, { season: 2014, prize_pool: 600 }, { season: 2015, prize_pool: 920 },
        { season: 2016, prize_pool: 800 }, { season: 2017, prize_pool: 920 }, { season: 2018, prize_pool: 1360 },
        { season: 2019, prize_pool: 1470 }, { season: 2021, prize_pool: 1060 }, { season: 2022, prize_pool: 2312 },
        { season: 2023, prize_pool: 3050 }, { season: 2024, prize_pool: 3163 }
      ]
    },
    {
      key: 'growth-fantasy-nfl-prize-pools',
      data: [
        { season: 2008, prize_pool: 1707 }, { season: 2009, prize_pool: 1782 }, { season: 2010, prize_pool: 1980 },
        { season: 2011, prize_pool: 1980 }, { season: 2012, prize_pool: 1980 }, { season: 2013, prize_pool: 1980 },
        { season: 2014, prize_pool: 2035 }, { season: 2015, prize_pool: 4715 }, { season: 2016, prize_pool: 5394 },
        { season: 2017, prize_pool: 4900 }, { season: 2018, prize_pool: 5920 }, { season: 2019, prize_pool: 6314 },
        { season: 2020, prize_pool: 6640 }, { season: 2021, prize_pool: 7210 }, { season: 2022, prize_pool: 7180 },
        { season: 2023, prize_pool: 7245 }, { season: 2024, prize_pool: 7835 }
      ]
    },
    {
      key: 'growth-fantasy-mlb-prize-pools',
      data: [
        { season: 2002, prize_pool: 200 }, { season: 2003, prize_pool: 180 }, { season: 2004, prize_pool: 240 },
        { season: 2007, prize_pool: 240 }, { season: 2008, prize_pool: 693 }, { season: 2009, prize_pool: 613 },
        { season: 2010, prize_pool: 645 }, { season: 2011, prize_pool: 590 }, { season: 2012, prize_pool: 590 },
        { season: 2013, prize_pool: 550 }, { season: 2014, prize_pool: 1790 }, { season: 2015, prize_pool: 1735 },
        { season: 2016, prize_pool: 1870 }, { season: 2017, prize_pool: 1688 }, { season: 2018, prize_pool: 1508 },
        { season: 2019, prize_pool: 1960 }, { season: 2020, prize_pool: 1000 }, { season: 2021, prize_pool: 2895 },
        { season: 2022, prize_pool: 2453 }, { season: 2023, prize_pool: 2290 }, { season: 2024, prize_pool: 2290 }
      ]
    },
    {
      key: 'growth-fantasy-nba-prize-pools',
      data: [
        { season: 2003, prize_pool: 420 }, { season: 2004, prize_pool: 530 }, { season: 2005, prize_pool: 530 },
        { season: 2006, prize_pool: 510 }, { season: 2007, prize_pool: 560 }, { season: 2008, prize_pool: 660 },
        { season: 2009, prize_pool: 627 }, { season: 2010, prize_pool: 660 }, { season: 2011, prize_pool: 660 },
        { season: 2012, prize_pool: 660 }, { season: 2013, prize_pool: 660 }, { season: 2014, prize_pool: 2048 },
        { season: 2015, prize_pool: 2091 }, { season: 2016, prize_pool: 1967 }, { season: 2017, prize_pool: 2024 },
        { season: 2018, prize_pool: 2068 }, { season: 2019, prize_pool: 1980 }, { season: 2020, prize_pool: 2025 },
        { season: 2021, prize_pool: 2100 }, { season: 2022, prize_pool: 2100 }, { season: 2023, prize_pool: 2100 },
        { season: 2024, prize_pool: 2100 }
      ]
    },
    {
      key: 'growth-nba-cdl-prize-pools',
      data: [
        { season: 2016, prize_pool: 3470 }, { season: 2017, prize_pool: 3470 }, { season: 2018, prize_pool: 3470 },
        { season: 2019, prize_pool: 3470 }, { season: 2020, prize_pool: 3470 }, { season: 2021, prize_pool: 3470 },
        { season: 2022, prize_pool: 3470 }, { season: 2023, prize_pool: 3470 }, { season: 2024, prize_pool: 3470 }
      ]
    },
    {
      key: 'growth-nba-survivor-prize-pools',
      data: [
        { season: 2019, prize_pool: 3686 }, { season: 2020, prize_pool: 3924 }, { season: 2021, prize_pool: 3083 },
        { season: 2022, prize_pool: 2755 }, { season: 2023, prize_pool: 2636 }, { season: 2024, prize_pool: 3510 }
      ]
    },
    {
      key: 'growth-world-cup-prize-pools',
      data: [
        { season: 2014, prize_pool: 3610 }, { season: 2018, prize_pool: 4960 }, { season: 2022, prize_pool: 6359 }
      ]
    },
    {
      key: 'growth-nba-allstar-prize-pools',
      data: [{ season: 2017, prize_pool: 280 }]
    },
    {
      key: 'growth-nba-playoffs-prize-pools',
      data: [{ season: 2008, prize_pool: 243 }, { season: 2009, prize_pool: 217 }]
    },
    {
      key: 'growth-pga-majors-prize-pools',
      data: [{ season: 2008, prize_pool: 189 }, { season: 2009, prize_pool: 294 }, { season: 2010, prize_pool: 240 }]
    }
  ];

  for (const row of rows) {
    await knex('season_data').insert({ key: row.key, data: knex.raw('?::jsonb', [JSON.stringify(row.data)]) });
  }
};
