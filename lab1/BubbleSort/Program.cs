﻿class Program
{
				static void Main()
				{
								List<int> input = new() { 30, 1, 3 };
								BubbleSort(input);
								input.ForEach(item => Console.WriteLine(item));
				}

				static void BubbleSort<T>(IList<T> list, IComparer<T> comparer)
				{
								bool isSorted = true;

								if (list.Count > 2)
								{
												isSorted = false;
								}

								while (!isSorted)
								{
												isSorted = true;
												for (int i = 0; i < list.Count - 1; i++)
												{
																if (comparer.Compare(list[i], list[i + 1]) > 0)
																{
																				(list[i], list[i + 1]) = (list[i + 1], list[i]);
																				isSorted = false;
																}
												}
								}
				}

				static void BubbleSort<T>(IList<T> list)
				{
								BubbleSort<T>(list, Comparer<T>.Default);
				}
}