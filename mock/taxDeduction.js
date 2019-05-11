var mockList = [
  {
    url: '/tax/user/getMateInfo.do',
    delay: 500,
    result: {
      "responseCode": "10001",
      "data": {
        "userName": "李明",
        "id": "090",
        "sex": "male",
      }
    }
  },
  {
    url: '/tax/user/getTestCase.do',
    delay: 500,
    result: {
      "responseCode": "10001",
      "data": {
        "userName": "测试用例2",
        "id": "090",
        "sex": "female",
      }
    }
  },
  {
    url: "/tax/user/signin.do",
    result: {
      "responseCode": "10001",
      "data": {
        code: 9,
      },
    }
  },
  {
    url: "/tax/user/logout.do",
    result: {
      "responseCode": "10001",
    }
  },

];

module.exports = mockList;