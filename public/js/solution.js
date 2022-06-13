export default function solution(newArr) {
  let color = ["yellow", "white", "green", "blue", "red", "orange"];
  let aside = [
    "upAside",
    "downAside",
    "rightAside",
    "leftAside",
    "frontAside",
    "backAside",
  ];

  //创建判断公式是否符合条件
  let reg = "UDRLFBMSEudrlfbxyz'2";
  let algArr = newArr.replace(/[, ]/g, "").split("");
  console.log(algArr);
  let searchFlag = true;
  algArr.map((value) => {
    //如果有reg字符以外的其他字符，searchFlag会变为false
    if (reg.search(value) == -1) {
      searchFlag = false;
    }
  });

  if (searchFlag) {
    //输公式符合规则，则会执行公式
    algReserve();
  } else {
    alert("输入公式不符规则");
  }
  //公式逆序的函数
  function algReserve() {
    // console.log(algArr);
    let newArr = [];
    //将魔方公式逆序中，R改为R'，R'改为R,R2改为R,R
    while (algArr.length >= 1) {
      if (algArr[1] === "'") {
        newArr.push(algArr[0]);
        algArr.splice(0, 2);
        // console.log(algArr);
        // break;
      } else if (algArr[1] === "2") {
        for (let i = 0; i < 2; i++) {
          newArr.push(algArr[0]);
        }
        algArr.splice(0, 2);
      } else {
        newArr.push(algArr[0] + "'");
        algArr.shift();
      }
    }
    //将整个数组翻转，实现魔方公式翻转
    newArr.reverse();
    // 遍历公式
    newArr.map((value, index, arr) => {
      switch (value) {
        //单层转动UDRLFB
        case "U":
          up();
          break;
        case "U'":
          upReserve();
          break;
        case "D":
          down();
          break;
        case "D'":
          downReserve();
          break;
        case "R":
          right();
          break;
        case "R'":
          rightReserve();
          break;
        case "L":
          left();
          break;
        case "L'":
          leftReserve();
          break;
        case "F":
          front();
          break;
        case "F'":
          frontReserve();
          break;
        case "B":
          back();
          break;
        case "B'":
        //双层转动udrlbf
        case "u":
          up();
          edgeReserve();
          break;
        case "u'":
          upReserve();
          edge();
          break;
        case "d":
          down();
          edge();
          break;
        case "d'":
          downReserve();
          edgeReserve();
          break;
        case "r":
          right();
          middleReserve();
          break;
        case "r'":
          rightReserve();
          middle();
          break;
        case "l":
          left();
          middle();
          break;
        case "l'":
          leftReserve();
          middleReserve();
          break;
        case "f":
          front();
          slice();
          break;
        case "f'":
          frontReserve();
          sliceReserve();
          break;
        case "B":
          back();
          sliceReserve();
          break;
        case "B'":
          backReserve();
          slice();
          break;
        //中层MSE
        case "M":
          middle();
          break;
        case "M'":
          middleReserve();
          break;
        case "E":
          edge();
          break;
        case "E'":
          edgeReserve();
          break;
        case "S":
          slice();
          break;
        case "S'":
          sliceReserve();
          break;
        //整体转动xyz
        case "x":
          right();
          middleReserve();
          leftReserve();
          break;
        case "x'":
          rightReserve();
          middle();
          left();
          break;
        case "y":
          up();
          edgeReserve();
          downReserve();
          break;
        case "y'":
          upReserve();
          edge();
          down();
          break;
        case "z":
          front();
          slice();
          backReserve();
          break;
        case "z'":
          frontReserve();
          sliceReserve();
          back();
          break;
      }
    });
  }
  //设置中层顺时针转动M
  function middle() {
    let upColor = ["red", "yellow", "orange", "white"];
    let colorNum = [
      [1, 4, 7],
      [5, 4, 3],
      [7, 4, 1],
      [3, 4, 5],
    ];
    //每次转动颜色变化的函数
    changeColor(upColor, colorNum, false, false);
    //向每个小方块填充颜色的函数
    showColor(colorData);
  }
  //设置中层逆时针转动M'
  function middleReserve() {
    let upColor = ["red", "white", "orange", "yellow"];
    let colorNum = [
      [1, 4, 7],
      [3, 4, 5],
      [7, 4, 1],
      [5, 4, 3],
    ];
    //每次转动颜色变化的函数
    changeColor(upColor, colorNum, false, false);
    //向每个小方块填充颜色的函数
    showColor(colorData);
  }
  //设置S层顺时针转动
  function slice() {
    let upColor = ["yellow", "blue", "white", "green"];
    let colorNum = [
      [1, 4, 7],
      [7, 4, 1],
      [7, 4, 1],
      [1, 4, 7],
    ];
    changeColor(upColor, colorNum, false, false);
    showColor(colorData);
  }
  //设置S层逆时针转动S'
  function sliceReserve() {
    let upColor = ["yellow", "green", "white", "blue"];
    let colorNum = [
      [1, 4, 7],
      [1, 4, 7],
      [7, 4, 1],
      [7, 4, 1],
    ];
    changeColor(upColor, colorNum, false, false);
    showColor(colorData);
  }
  //设置E层顺时针转动
  function edge() {
    let upColor = ["red", "blue", "orange", "green"];
    let colorNum = [
      [3, 4, 5],
      [3, 4, 5],
      [5, 4, 3],
      [5, 4, 3],
    ];
    changeColor(upColor, colorNum, false, false);
    showColor(colorData);
  }
  //设置E层逆时针转动E'
  function edgeReserve() {
    let upColor = ["red", "green", "orange", "blue"];
    let colorNum = [
      [3, 4, 5],
      [5, 4, 3],
      [5, 4, 3],
      [3, 4, 5],
    ];
    changeColor(upColor, colorNum, false, false);
    showColor(colorData);
  }

  //设置顶层顺时针转动 即U
  function up() {
    //顶层转动会影响四个面颜色变化
    /*
          由于函数changeColor()中让颜色变化的循环是逆序的，
          所以up虽然是实现顺时针转动，但下面upColor，colorNum，clockwise都是逆序的
        */
    let upColor = ["green", "orange", "blue", "red"];
    //将红绿橙蓝上层三个方块颜色数字化
    //数字表示的是<div class="miniaside"></div>的序号
    //upcolor要和colornum的顺序对应上
    let colorNum = [
      [2, 1, 0], //
      [2, 1, 0],
      [0, 1, 2],
      [0, 1, 2],
    ];
    //保存转动的面，即顶层
    let moveAside = "upAside";
    /*
        每个面有9个div，正中心div序号是4，没有颜色变化，
        由于每个面的方向受样式rotate影响，36785210有可能是顺时针，也可能是逆时针，具体div的顺序可以在控制台查看
        */
    let clockwise = "36785210";

    //每次转动颜色变化的函数
    changeColor(upColor, colorNum, moveAside, clockwise);
    //向每个小方块填充颜色的函数
    showColor(colorData);
  }
  //设置顶层逆时针转动，即U'，
  function upReserve() {
    let upColor = ["red", "blue", "orange", "green"];
    let colorNum = [
      [0, 1, 2],
      [0, 1, 2],
      [2, 1, 0],
      [2, 1, 0],
    ];
    let moveAside = "upAside";
    let clockwise = "01258763";
    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }
  //设置底层顺时针转动 即D
  function down() {
    let upColor = ["green", "red", "blue", "orange"]; //["green", "orange", "blue", "red", "green"]
    let colorNum = [
      [8, 7, 6],
      [6, 7, 8],
      [6, 7, 8],
      [8, 7, 6],
    ];
    let moveAside = "downAside";
    let clockwise = "01258763";
    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }
  //设置底层逆时针转动 即D'
  function downReserve() {
    //顶层转动会影响四个面颜色变化
    let upColor = ["green", "orange", "blue", "red"];
    let colorNum = [
      [8, 7, 6],
      [8, 7, 6],
      [6, 7, 8],
      [6, 7, 8],
    ];
    let moveAside = "downAside";
    let clockwise = "36785210";

    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }
  //设置右边层顺时针转动 即R
  function right() {
    //顶层转动会影响四个面颜色变化
    let upColor = ["white", "orange", "yellow", "red"];
    let colorNum = [
      [8, 7, 6],
      [0, 3, 6],
      [6, 7, 8],
      [6, 3, 0],
    ];
    let moveAside = "rightAside";
    let clockwise = "36785210";
    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }

  //设置右边层逆时针转动 即R'
  function rightReserve() {
    let upColor = ["red", "yellow", "orange", "white"];
    let colorNum = [
      [6, 3, 0],
      [6, 7, 8],
      [0, 3, 6],
      [8, 7, 6],
    ];
    let moveAside = "rightAside";
    let clockwise = "01258763";
    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }
  //设置前面层逆时针转动 即F
  function frontReserve() {
    //顶层转动会影响四个面颜色变化
    let upColor = ["yellow", "green", "white", "blue"];
    let colorNum = [
      [0, 3, 6],
      [0, 3, 6],
      [6, 3, 0],
      [6, 3, 0],
    ];
    let moveAside = "frontAside";
    let clockwise = "36785210";
    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }
  //设置前面层顺时针转动 即F
  function front() {
    //顶层转动会影响四个面颜色变化
    let upColor = ["yellow", "blue", "white", "green"]; //"red", "yellow", "orange", "white", "red"
    let colorNum = [
      [0, 3, 6],
      [6, 3, 0],
      [6, 3, 0],
      [0, 3, 6],
    ];
    let moveAside = "frontAside";
    let clockwise = "01258763";

    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }
  //设置左边层顺时针转动 即L
  function left() {
    //顶层转动会影响四个面颜色变化
    let upColor = ["red", "yellow", "orange", "white"];
    let colorNum = [
      [8, 5, 2],
      [0, 1, 2],
      [2, 5, 8],
      [2, 1, 0],
    ];
    let moveAside = "leftAside"; //36785210
    let clockwise = "01258763";

    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }
  //设置左边层逆时针转动 即L'
  function leftReserve() {
    //顶层转动会影响四个面颜色变化
    let upColor = ["red", "white", "orange", "yellow"];
    let colorNum = [
      [8, 5, 2],
      [2, 1, 0],
      [2, 5, 8],
      [0, 1, 2],
    ];
    let moveAside = "leftAside";
    let clockwise = "36785210";
    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }
  //设置背面层顺时针转动 即B
  function back() {
    let upColor = ["yellow", "green", "white", "blue"];
    let colorNum = [
      [2, 5, 8],
      [2, 5, 8],
      [8, 5, 2],
      [8, 5, 2],
    ];
    let moveAside = "backAside";
    let clockwise = "36785210";
    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }
  //设置背面层逆时针转动 即B'
  function backReserve() {
    let upColor = ["yellow", "blue", "white", "green"];
    let colorNum = [
      [2, 5, 8],
      [8, 5, 2],
      [8, 5, 2],
      [2, 5, 8],
    ];
    let moveAside = "backAside";
    let clockwise = "01258763";
    changeColor(upColor, colorNum, moveAside, clockwise);
    showColor(colorData);
  }

  // 先将魔方六个面的九个方块颜色存储到colorData，通过修改每个面每个小方块的颜色，从而实现魔方转动
  let colorData = [];
  color.map((val, index, arr) => {
    let asideColor = [];
    for (let i = 0; i < 9; i++) {
      asideColor.push(val);
    }
    colorData.push(asideColor);
  });
  // 实现魔方转动
  function changeColor(upColor, colorNum, moveAside, clockwise) {
    //转动后，改变四个面的上层颜色
    //将第一个面的颜色存起来，
    let storageColor = [];
    for (let i = 0; i < colorNum[0].length; i++) {
      // console.log(colorData[color.indexOf(upColor[0])][colorNum[0][i]]);
      storageColor.push(colorData[color.indexOf(upColor[0])][colorNum[0][i]]);
    }
    // console.log(storageColor);
    //改变四个面顶上三个方块的颜色，
    for (var i = 0; i < upColor.length; i++) {
      for (var j = 0; j < colorNum[i].length; j++) {
        if (i < 3) {
          //如把橙面2，1，0位置的颜色赋值给绿面的2，1，0.
          colorData[color.indexOf(upColor[i])][colorNum[i][j]] =
            colorData[color.indexOf(upColor[i + 1])][colorNum[i + 1][j]];
        } else {
          colorData[color.indexOf(upColor[3])][colorNum[3][j]] =
            storageColor[j];
        }
      }
    }

    //改变顶层颜色位置
    //先储存第一个颜色
    //转动中层时，moveAside, clockwise不存在
    if (moveAside) {
      let arr = clockwise.split("");
      // console.log(moveAside);
      //存储第一个棱块颜色
      let num = aside.indexOf(moveAside);

      //魔方中棱块的颜色是不会移动到角块的，所以只执行一次是不行的，循环两次就可以把棱块颜色赋值给上一个棱块颜色
      for (var i = 0; i < 2; i++) {
        var tmp = colorData[num][arr[0]]; //保存第一个数据
        for (var j = 0; j < arr.length; j++) {
          if (j >= arr.length - 1) {
            colorData[num][arr[j]] = tmp;
          } else {
            colorData[num][arr[j]] = colorData[num][arr[j + 1]];
          }
        }
      }
    }
    // console.log(colorData[0]);
  }
  return colorData;

  //把colorData渲染到每个小方块
  //   function showColor(colorData) {
  //     aside.map((val, index, arr) => {
  //       let side = document.querySelectorAll("." + val + " div");
  //       for (let i = 0; i < 9; i++) {
  //         side[i].style.backgroundColor = colorData[index][i];
  //       }
  //     });
  //   }
}
