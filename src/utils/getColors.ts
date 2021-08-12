
export default (vote: number): { color: string, borderColor: string } => {
  const red = Math.round(200 - vote * 12);
  const green = Math.round(vote * 12 + 80);
  return {
    color: `rgba(${red},${green},0,1)`,
    borderColor: `rgba(${red},${green},0,1)`
  }
}
