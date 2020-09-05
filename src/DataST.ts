export interface SimpleData {
  id: string;
  title: string;
  description: string;
}

export interface SimpleDataDto {
  title: string;
  description: string;
}

export default class DataST {
  private static instance: DataST;
  private data: SimpleData[] = [];

  private constructor() {}

  public static getInstance(): DataST {
    if (!DataST.instance) {
      DataST.instance = new DataST();
    }

    return DataST.instance;
  }

  public addSimpleData(simpleDataDto: SimpleDataDto): SimpleData {
    const newSimpleData: SimpleData = {
      id: Date.now().toString(16),
      ...simpleDataDto,
    };

    this.data.push(newSimpleData);

    return newSimpleData;
  }

  public getSimpleData(): SimpleData[] {
    return this.data;
  }

  public getOneSimpleData(id: string): SimpleData {
    const result = this.data.find((simpleData) => simpleData?.id === id);

    if (result) return result;

    throw Error("Not Found.");
  }

  public updateOneSimpleData(
    id: string,
    simpleDataDto: SimpleDataDto
  ): SimpleData {
    const index = this.data.findIndex((simpleData) => simpleData.id === id);

    if (index === -1) throw new Error("Invalid id.");

    if (simpleDataDto.title) this.data[index].title = simpleDataDto.title;

    if (simpleDataDto.description)
      this.data[index].description = simpleDataDto.description;

    return this.data[index];
  }

  public deleteOneSimpleData(id: string): void {
    this.data = this.data.filter((simpleData) => simpleData.id !== id);
  }
}
