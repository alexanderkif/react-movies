import getColors from "./getColors";

describe('DetailsView test', () => {

  it('color with vote = 0', () => {
    const vote = 0;
    expect(getColors(vote).borderColor).toBe('rgba(200,80,0,1)');
    expect(getColors(vote).color).toBe('rgba(200,80,0,1)');
  });

  it('color with vote = 5', () => {
    const vote = 5;
    expect(getColors(vote).borderColor).toBe('rgba(140,140,0,1)');
    expect(getColors(vote).color).toBe('rgba(140,140,0,1)');
  });

  it('color with vote = 10', () => {
    const vote = 10;
    expect(getColors(vote).borderColor).toBe('rgba(80,200,0,1)');
    expect(getColors(vote).color).toBe('rgba(80,200,0,1)');
  });

});
