const getWeeklyEmailHtml = (mentions) => {
  const getEachMention = () => {
    return mentions.map((mention) => {
      const { img, platform, text, author, company } = mention;
      return `<div style="display: flex;padding: 5px;">
            <div>
                <img src=${img} alt=${company} style="width:80px;height:80px;">
            </div>
            <div>
                <h4>${author}</h4>
                <p>${platform}</p>
                <p>${text}</p>

            </div>
        </div>`;
    });
  };

  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weekly Email</title>
</head>
<body style="
    font-family: Arial, sans-serif;
    font-size:12px;
    width: 500px;
    margin:auto;">
    <div    
    style=" 
        height: 140px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        background: linear-gradient(-45deg, #3f6eda, #6d8af3);
        ">
        <p style="
            font-size: 20px;
            color:#fff;
            font-weight: bold;
        ">
        WEEKLY REPORT
        </p>
        <p style="
            font-size:60px;
            color:#fff;
            opacity: 0.1;
            ">
        @
        </p>
    </div>
    <h4> Your mentions for this week:</h4>
    ${getEachMention()}
    <div style="display: flex;justify-content: center;align-items: center;">
    <a href='http://localhost:3000/settings'>
      <button
        style="
          border: none;
          width: 150px;
          height: 52px;
          margin-top: 20px;
          border-radius: 30px;
          margin-left: 2rem;
          background-color: #6583f2;
          color: #fff;
        "
       
      >
        Check More...
      </button>
    </a>
    </div>
  
</body>
</html>

    `;
};

module.exports = getWeeklyEmailHtml;
