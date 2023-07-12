export const formatStrMusic = (name: string, max: number, completed?: boolean) => {
    let nameFormat = name;
    if (name.length > max && !completed) {
      nameFormat = name.substring(0, max) + "...";
    }

    nameFormat = nameFormat.replaceAll("-", " ").replaceAll("--", " ");

    return nameFormat;
  };

export const formatDurationMusic = (time: string | number) => {
    const rawTime = Number(time);

    const min = Math.floor(rawTime / 60);
    const sec = Math.floor(rawTime % 60);

    const duration = `${min}:${sec < 10 ? "0" + String(sec) : String(sec)}`;

    return duration;
};