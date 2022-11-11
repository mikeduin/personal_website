module.exports = {

  getGroups: (season) => {
    const groups = [
      {
        "season": 2018,
        "selected": null,
        "groups": {
          "A": ["Egypt", "Russia", "Saudi Arabia", "Uruguay"],
          "B": ["Iran", "Morocco", "Portugal", "Spain"],
          "C": ["Australia", "Denmark", "France", "Peru"],
          "D": ["Argentina", "Croatia", "Iceland", "Nigeria"],
          "E": ["Brazil", "Costa Rica", "Serbia", "Switzerland"],
          "F": ["Germany", "Korea Republic", "Mexico", "Sweden"],
          "G": ["Belgium", "England", "Panama", "Tunisia"],
          "H": ["Colombia", "Japan", "Poland", "Senegal"]
        }
      },
      {
        "season": 2022,
        "selected": null,
        "groups": {
          "A": ["Ecuador", "Netherlands", "Qatar", "Senegal"],
          "B": ["England", "Iran", "United States", "Wales"],
          "C": ["Argentina", "Mexico", "Poland", "Saudi Arabia"],
          "D": ["Australia", "Denmark", "France", "Tunisia"],
          "E": ["Costa Rica", "Germany", "Japan", "Spain"],
          "F": ["Belgium", "Canada", "Croatia", "Morocco"],
          "G": ["Brazil", "Cameroon", "Serbia", "Switzerland"],
          "H": ["Ghana", "South Korea", "Portugal", "Uruguay"]
        }
      },
    ];

    return groups.filter(g => g.season === season);
  }
};
