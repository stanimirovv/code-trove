from collections import defaultdict
from math import prod

visible: int = 0                    # Part 1
scenic_trees = defaultdict(list)    # Part 2

# format puzzle input
all_lines: list = ["x" + line.strip() + "x" 
    for line in open("input_real")]
line_length: int = len(all_lines[0])
treeline: str = "".join(["x" * line_length] + all_lines + ["x" * line_length])

def visible_in_direction(
    i: int, 
    x: int, 
    offset: int,
    c: int = 0) -> bool:

    try:
        if int(treeline[x + offset]) >= int(treeline[i]):
            scenic_trees[i].append(c+1)
            return False
        
        else:
            return visible_in_direction(i, x + offset, offset, c + 1)
    
    except ValueError:
        scenic_trees[i].append(c)
        return True
    

def main():
    global visible

    for i, tree in enumerate(treeline):
        if tree.isdigit():
            top = visible_in_direction(i, i, -line_length)
            left = visible_in_direction(i, i, -1)
            right = visible_in_direction(i, i, 1)
            bottom = visible_in_direction(i, i, line_length)

            if right or left or top or bottom: 
                visible += 1

    scenic_score = max(map(lambda t: prod(t[1]), scenic_trees.items()))

    print("Part one: ", visible)
    print("Part two: ", scenic_score)


if __name__ == "__main__":
    main()