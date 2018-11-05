/* eslint-disable */
export function getRecords() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: [
          {
            className: '经济法基础-法律基础-1',
            duration: 3575,
            fileSize: 240414863,
            videoUrl:
              'http://1256346881.vod2.myqcloud.com/12a10f0bvodgzp1256346881/fbcda1095285890782040381095/lVsHBMBzMLYA.mp4',
          },
          {
            className: '经济法基础-法律基础-2',
            duration: 3583,
            fileSize: 239586574,
            videoUrl:
              'http://1256346881.vod2.myqcloud.com/12a10f0bvodgzp1256346881/fbdf53755285890782040390998/WWePdLdWmaYA.mp4',
          },
        ],
        message: '操作成功',
      });
    }, 100);
  }).then(res => {
    if (res.code) {
      throw new Error(`request error: ${res.code}`);
    }
    return Array.isArray(res.data) ? res.data : [];
  });
}

export function formatDuration(duration) {
  duration = parseInt(duration, 10);
  if (isNaN(duration)) throw new Error(`duration must be an integer`);
  let h = 0,
    m = 0,
    s = 0;
  while (h * 60 * 60 < duration) {
    h++;
  }
  duration -= --h * 60 * 60;
  while (m * 60 < duration) {
    m++;
  }
  duration -= --m * 60;
  s = duration;
  return `${doubleDigit(h)}:${doubleDigit(m)}:${doubleDigit(s)}`;
}

export function doubleDigit(num) {
  num = String(num);
  if (num.length < 2) {
    num = '0' + num;
  }
  return num;
}
