import prisma from "./src/config/db.js";

const buildDescription = (links = []) => {
  const extraLinks = links.slice(1);

  if (extraLinks.length === 0) {
    return "Imported from Instagram daily DSA list.";
  }

  return `Imported from Instagram daily DSA list. Alternative links: ${extraLinks.join(
    " | "
  )}`;
};

const data = [
  {
    name: "Two Pointers",
    problems: [
      ["Pair with Target Sum", "Easy", ["https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/"]],
      ["Rearrange 0 and 1", "Easy", ["https://www.geeksforgeeks.org/problems/segregate-0s-and-1s5106/1"]],
      [
        "Remove Duplicates",
        "Easy",
        [
          "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
          "https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/",
          "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
        ],
      ],
      ["Squaring a Sorted Array", "Easy", ["https://leetcode.com/problems/squares-of-a-sorted-array/"]],
      ["Triplet Sum to Zero", "Medium", ["https://leetcode.com/problems/3sum/"]],
      ["Triplet Sum Close to Target", "Medium", ["https://leetcode.com/problems/3sum-closest/"]],
      [
        "Triplets with Smaller Sum",
        "Medium",
        ["https://www.geeksforgeeks.org/problems/count-triplets-with-sum-smaller-than-x5549/1"],
      ],
      [
        "Subarrays with Product Less than a Target",
        "Medium",
        ["https://leetcode.com/problems/subarray-product-less-than-k/"],
      ],
      ["Dutch National Flag Problem", "Medium", ["https://leetcode.com/problems/sort-colors/description/"]],
      ["Quadruple Sum to Target", "Medium", ["https://leetcode.com/problems/4sum/"]],
      [
        "Comparing Strings containing Backspaces",
        "Medium",
        ["https://leetcode.com/problems/backspace-string-compare/"],
      ],
      [
        "Minimum Window Sort",
        "Medium",
        [
          "https://leetcode.com/problems/shortest-unsorted-continuous-subarray/",
          "https://www.ideserve.co.in/learn/minimum-length-subarray-sorting-which-results-in-sorted-array",
        ],
      ],
    ],
  },
  {
    name: "Fast & Slow Pointers",
    problems: [
      ["LinkedList Cycle", "Easy", ["https://leetcode.com/problems/linked-list-cycle/"]],
      ["Start of LinkedList Cycle", "Medium", ["https://leetcode.com/problems/linked-list-cycle-ii/"]],
      ["Happy Number", "Medium", ["https://leetcode.com/problems/happy-number/"]],
      ["Find Duplicate Number", "Medium", ["https://leetcode.com/problems/find-the-duplicate-number/description/"]],
      ["Middle of the LinkedList", "Easy", ["https://leetcode.com/problems/middle-of-the-linked-list/"]],
      ["Palindrome LinkedList", "Medium", ["https://leetcode.com/problems/palindrome-linked-list/"]],
      ["Rearrange a LinkedList", "Medium", ["https://leetcode.com/problems/reorder-list/"]],
      ["Cycle in a Circular Array", "Hard", ["https://leetcode.com/problems/circular-array-loop/"]],
    ],
  },
  {
    name: "Sliding Window",
    problems: [
      ["Maximum Sum Subarray of Size K", "Easy", ["https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1"]],
      ["Smallest Subarray with a given sum", "Easy", ["https://leetcode.com/problems/minimum-size-subarray-sum/"]],
      ["Longest Substring with K Distinct Characters", "Medium", ["https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1"]],
      ["Fruits into Baskets", "Medium", ["https://leetcode.com/problems/fruit-into-baskets/"]],
      ["No-repeat Substring", "Hard", ["https://leetcode.com/problems/longest-substring-without-repeating-characters/"]],
      ["Longest Substring with Same Letters after Replacement", "Hard", ["https://leetcode.com/problems/longest-repeating-character-replacement/"]],
      ["Longest Subarray with Ones after Replacement", "Hard", ["https://leetcode.com/problems/max-consecutive-ones-iii/"]],
      ["Minimum Size Subarray Sum", "Easy", ["https://leetcode.com/problems/minimum-size-subarray-sum/"]],
      ["Minimum Size Substring", "Hard", ["https://leetcode.com/problems/minimum-window-substring/description/?envType=study-plan-v2&envId=top-interview-150"]],
      ["Permutation in a String", "Hard", ["https://leetcode.com/problems/permutation-in-string/"]],
      ["String Anagrams", "Hard", ["https://leetcode.com/problems/find-all-anagrams-in-a-string/"]],
      ["Words Concatenation", "Hard", ["https://leetcode.com/problems/substring-with-concatenation-of-all-words/"]],
    ],
  },
  {
    name: "Kadane Pattern",
    problems: [
      ["Maximum Subarray Sum", "Medium", ["https://leetcode.com/problems/maximum-subarray/?utm_source=chatgpt.com"]],
      ["Minimum Subarray Sum", "Medium", ["https://www.geeksforgeeks.org/problems/smallest-sum-contiguous-subarray/1"]],
      ["Maximum Product Subarray", "Medium", ["https://leetcode.com/problems/maximum-product-subarray/?utm_source=chatgpt.com"]],
      ["Maximum Subarray Sum with One Deletion", "Medium", ["https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/description/"]],
      ["Maximum Absolute Sum of Any Subarray", "Medium", ["https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/"]],
      ["Maximum Sum Circular Subarray", "Medium", ["https://leetcode.com/problems/maximum-sum-circular-subarray/?utm_source=chatgpt.com"]],
    ],
  },
  {
    name: "Prefix Sum",
    problems: [
      ["Subarray Sum Equals K", "Easy", ["https://leetcode.com/problems/subarray-sum-equals-k/description/"]],
      ["Find Pivot Index", "Easy", ["https://leetcode.com/problems/find-pivot-index/description/"]],
      ["Subarray Sums Divisible By K", "Medium", ["https://leetcode.com/problems/subarray-sums-divisible-by-k/description/"]],
      ["Contiguous Array", "Medium", ["https://leetcode.com/problems/contiguous-array/description/"]],
      ["Shortest Subarray With Sum at Least K", "Hard", ["https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/description/"]],
      ["Count Range Sum", "Hard", ["https://leetcode.com/problems/count-of-range-sum/description/"]],
    ],
  },
  {
    name: "Merge Intervals",
    problems: [
      ["Merge Intervals", "Medium", ["https://leetcode.com/problems/merge-intervals/description/"]],
      ["Insert Interval", "Medium", ["https://leetcode.com/problems/insert-interval/"]],
      ["Intervals Intersection", "Medium", ["https://leetcode.com/problems/interval-list-intersections/description/"]],
      ["Overlapping Intervals", "Medium", ["https://www.geeksforgeeks.org/check-if-any-two-intervals-overlap-among-a-given-set-of-intervals/"]],
      ["Minimum Meeting Rooms", "Hard", ["https://www.geeksforgeeks.org/problems/attend-all-meetings-ii/1"]],
      ["Maximum CPU Load", "Hard", ["https://www.geeksforgeeks.org/maximum-cpu-load-from-the-given-list-of-jobs/"]],
      ["Employee Free Time", "Hard", ["https://www.codertrain.co/employee-free-time"]],
    ],
  },
  {
    name: "Cyclic Sort",
    problems: [
      ["Cyclic Sort", "Easy", ["https://www.geeksforgeeks.org/sort-an-array-which-contain-1-to-n-values-in-on-using-cycle-sort/"]],
      ["Find the Missing Number", "Easy", ["https://leetcode.com/problems/missing-number/"]],
      ["Find All Missing Numbers", "Easy", ["https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/"]],
      ["Find the Duplicate Number", "Easy", ["https://leetcode.com/problems/find-the-duplicate-number/"]],
      ["Find All Duplicate Numbers", "Easy", ["https://leetcode.com/problems/find-all-duplicates-in-an-array/"]],
      ["Find the Corrupt Pair", "Easy", ["https://thecodingsimplified.com/find-currupt-pair/"]],
      ["Find the Smallest Missing Positive Number", "Medium", ["https://leetcode.com/problems/first-missing-positive/"]],
      ["Find the First K Missing Positive Numbers", "Hard", ["https://thecodingsimplified.com/find-the-first-k-missing-positive-number/"]],
    ],
  },
  {
    name: "In-place Reversal of a LinkedList",
    problems: [
      ["Reverse a LinkedList", "Easy", ["https://leetcode.com/problems/reverse-linked-list/"]],
      ["Reverse a Sub-list", "Medium", ["https://leetcode.com/problems/reverse-linked-list-ii/"]],
      ["Reverse List in Pairs", "Medium", ["https://leetcode.com/problems/swap-nodes-in-pairs/description/"]],
      ["Reverse Every K-element Sub-list", "Hard", ["https://leetcode.com/problems/reverse-nodes-in-k-group/"]],
      ["Reverse Nodes in EVEN Length Groups", "Hard", ["https://leetcode.com/problems/reverse-nodes-in-even-length-groups/description/"]],
      ["Rotate a LinkedList", "Medium", ["https://leetcode.com/problems/rotate-list/"]],
    ],
  },
  {
    name: "Stack",
    problems: [
      ["Remove Adjacent Duplicates", "Easy", ["https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/description/"]],
      ["Balanced Parentheses", "Easy", ["https://leetcode.com/problems/valid-parentheses/description/"]],
      ["Reverse a String", "Easy", ["https://leetcode.com/problems/reverse-string/"]],
      ["Next Greater Element", "Easy", ["https://leetcode.com/problems/next-greater-element-ii/description/"]],
      ["Daily Temperatures", "Easy", ["https://leetcode.com/problems/daily-temperatures/"]],
      ["Remove Nodes From Linked List", "Easy", ["https://leetcode.com/problems/remove-nodes-from-linked-list/"]],
      ["Remove All Adjacent Duplicates in String II", "Medium", ["https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/"]],
      ["Simplify Path", "Medium", ["https://leetcode.com/problems/simplify-path/"]],
      ["Remove K Digits", "Hard", ["https://leetcode.com/problems/remove-k-digits/"]],
    ],
  },
  {
    name: "Hash Maps",
    problems: [
      ["First Non-repeating Character", "Easy", ["https://leetcode.com/problems/first-unique-character-in-a-string/"]],
      ["Maximum Number of Balloons", "Easy", ["https://leetcode.com/problems/maximum-number-of-balloons/"]],
      ["Longest Palindrome", "Easy", ["https://leetcode.com/problems/longest-palindrome/"]],
      ["Ransom Note", "Easy", ["https://leetcode.com/problems/ransom-note/"]],
    ],
  },
  {
    name: "Binary Search",
    problems: [
      ["Binary Search Basic", "Easy", ["https://leetcode.com/problems/binary-search/"]],
      ["Upper Bound / Ceiling", "Easy", ["https://www.geeksforgeeks.org/problems/ceil-in-a-sorted-array/1"]],
      ["First and Last Position", "Medium", ["https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"]],
      ["Count Number of Occurrences", "Medium", ["https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1"]],
      ["Search in Infinite Sorted Array", "Medium", ["https://www.geeksforgeeks.org/find-position-element-sorted-array-infinite-numbers/"]],
      ["Peak Index in Mountain Array", "Medium", ["https://leetcode.com/problems/peak-index-in-a-mountain-array/"]],
      ["Find Peak Element", "Medium", ["https://leetcode.com/problems/find-peak-element/"]],
      ["Find Minimum in Rotated Sorted Array", "Medium", ["https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"]],
      ["Find Number of Rotations in Sorted Array", "Medium", ["https://www.geeksforgeeks.org/problems/rotation4723/1"]],
      ["Search in Rotated Sorted Array", "Medium", ["https://leetcode.com/problems/search-in-rotated-sorted-array/description/"]],
      ["Koko Eating Bananas", "Medium", ["https://leetcode.com/problems/koko-eating-bananas/"]],
      ["Minimum Number of Days to Make m Bouquets", "Medium", ["https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/"]],
      ["Aggressive Cows", "Hard", ["https://www.geeksforgeeks.org/problems/aggressive-cows/1"]],
      ["H-Index II", "Medium", ["https://leetcode.com/problems/h-index-ii/description/"]],
      ["Maximum Candies Allocated to K Children", "Medium", ["https://leetcode.com/problems/maximum-candies-allocated-to-k-children/description/"]],
      ["Capacity to Ship Packages Within D Days", "Medium", ["https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/"]],
      ["Book Allocation Problem", "Hard", ["https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1"]],
      ["Split Array Largest Sum", "Hard", ["https://leetcode.com/problems/split-array-largest-sum/description/"]],
      ["Search a 2D Matrix", "Medium", ["https://leetcode.com/problems/search-a-2d-matrix/"]],
      ["Search a 2D Matrix II", "Hard", ["https://leetcode.com/problems/search-a-2d-matrix-ii/description/"]],
      ["Kth Smallest Element in a Sorted Matrix", "Medium", ["https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/"]],
      ["Kth Smallest Number in Multiplication Table", "Hard", ["https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/description/"]],
      ["Median of Two Sorted Arrays", "Hard", ["https://leetcode.com/problems/median-of-two-sorted-arrays/"]],
    ],
  },
  {
    name: "Heap Pattern",
    problems: [
      ["Kth Smallest Element", "Medium", ["https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1"]],
      ["Kth Largest Element in an Array", "Medium", ["https://leetcode.com/problems/kth-largest-element-in-an-array/description/"]],
      ["Top K Frequent Elements", "Medium", ["https://leetcode.com/problems/top-k-frequent-elements/description/"]],
      ["Top K Frequent Words", "Medium", ["https://leetcode.com/problems/top-k-frequent-words/description/"]],
      ["K Closest Points to Origin", "Medium", ["https://leetcode.com/problems/k-closest-points-to-origin/description/"]],
      ["Find K Closest Elements", "Medium", ["https://leetcode.com/problems/find-k-closest-elements/description/"]],
      ["The K Weakest Rows in a Matrix", "Easy", ["https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/description/"]],
      ["Merge K Sorted Arrays", "Hard", ["https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1"]],
      ["Kth Smallest Element in a Sorted Matrix", "Medium", ["https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/"]],
      ["Last Stone Weight", "Easy", ["https://leetcode.com/problems/last-stone-weight/description/"]],
      ["Task Scheduler", "Medium", ["https://leetcode.com/problems/task-scheduler/description/"]],
      ["Reorganize String", "Medium", ["https://leetcode.com/problems/reorganize-string/"]],
      ["Minimum Number of Refueling Stops", "Hard", ["https://leetcode.com/problems/minimum-number-of-refueling-stops/description/"]],
      ["IPO", "Hard", ["https://leetcode.com/problems/ipo/description/"]],
      ["Course Schedule III", "Hard", ["https://leetcode.com/problems/course-schedule-iii/description/"]],
      ["Find Median from Data Stream", "Hard", ["https://leetcode.com/problems/find-median-from-data-stream/description/"]],
      ["Sliding Window Median", "Hard", ["https://leetcode.com/problems/sliding-window-median/description/"]],
    ],
  },
  {
    name: "Recursion and Backtracking",
    problems: [
      ["Fibonacci", "Easy", ["https://leetcode.com/problems/fibonacci-number/description/", "https://www.youtube.com/watch?v=j4wjZqzhMqc&t"]],
      ["Check if String is Palindrome", "Easy", ["https://www.geeksforgeeks.org/problems/palindrome-string0817/1", "https://www.youtube.com/watch?v=j4wjZqzhMqc&t"]],
      ["Check if Array is Sorted", "Easy", ["https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1", "https://www.youtube.com/watch?v=-gC-QEdpvO4"]],
      ["Sum of Digits of a Number", "Easy", ["https://www.geeksforgeeks.org/problems/sum-of-digits1742/1", "https://www.youtube.com/watch?v=-gC-QEdpvO4"]],
      ["Remove Occurrences of a Character in String", "Easy", ["https://www.geeksforgeeks.org/problems/remove-all-occurrences-of-a-character-in-a-string/1", "https://www.youtube.com/watch?v=-gC-QEdpvO4"]],
      ["Generate Parentheses", "Medium", ["https://leetcode.com/problems/generate-parentheses/description/"]],
      ["Letter Combinations of a Phone Number", "Medium", ["https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/", "https://www.youtube.com/watch?v=IKfIT6uFOcs"]],
      ["Permutations", "Medium", ["https://leetcode.com/problems/permutations/description/"]],
      ["Combination Sum", "Medium", ["https://leetcode.com/problems/combination-sum/description/"]],
      ["Palindrome Partitioning", "Medium", ["https://leetcode.com/problems/palindrome-partitioning/description/"]],
    ],
  },
  {
    name: "Tree Pattern",
    problems: [
      ["Binary Tree Inorder Traversal", "Easy", ["https://leetcode.com/problems/binary-tree-inorder-traversal/description/"]],
      ["Binary Tree Preorder Traversal", "Easy", ["https://leetcode.com/problems/binary-tree-preorder-traversal/description/"]],
      ["Binary Tree Postorder Traversal", "Easy", ["https://leetcode.com/problems/binary-tree-postorder-traversal/description/"]],
      ["Binary Tree Level Order Traversal", "Medium", ["https://leetcode.com/problems/binary-tree-level-order-traversal/description/"]],
      ["Binary Tree Zigzag Level Order Traversal", "Medium", ["https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/"]],
      ["Binary Tree Level Order Traversal II", "Medium", ["https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/"]],
      ["Invert Binary Tree", "Easy", ["https://leetcode.com/problems/invert-binary-tree/description/"]],
      ["Symmetric Tree", "Easy", ["https://leetcode.com/problems/symmetric-tree/description/"]],
      ["Same Tree", "Easy", ["https://leetcode.com/problems/same-tree/description/"]],
      ["Subtree of Another Tree", "Easy", ["https://leetcode.com/problems/subtree-of-another-tree/description/"]],
      ["Flip Equivalent Binary Trees", "Medium", ["https://leetcode.com/problems/flip-equivalent-binary-trees/description/"]],
      ["Lowest Common Ancestor of a Binary Tree", "Medium", ["https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/"]],
      ["Search in a Binary Search Tree", "Easy", ["https://leetcode.com/problems/search-in-a-binary-search-tree/"]],
      ["Lowest Common Ancestor of a BST", "Easy", ["https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/"]],
      ["Lowest Common Ancestor of Deepest Leaves", "Medium", ["https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/description/"]],
      ["Two Sum IV - Input is a BST", "Easy", ["https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/"]],
      ["Kth Smallest Element in a BST", "Medium", ["https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/"]],
      ["Minimum Depth of Binary Tree", "Easy", ["https://leetcode.com/problems/minimum-depth-of-binary-tree/description/"]],
      ["Maximum Depth of Binary Tree", "Easy", ["https://leetcode.com/problems/maximum-depth-of-binary-tree/description/"]],
      ["Balanced Binary Tree", "Easy", ["https://leetcode.com/problems/balanced-binary-tree/description/"]],
      ["Diameter of Binary Tree", "Easy", ["https://leetcode.com/problems/diameter-of-binary-tree/description/"]],
      ["Check Completeness of a Binary Tree", "Medium", ["https://leetcode.com/problems/check-completeness-of-a-binary-tree/description/"]],
      ["Validate Binary Search Tree", "Medium", ["https://leetcode.com/problems/validate-binary-search-tree/description/"]],
      ["Recover Binary Search Tree", "Hard", ["https://leetcode.com/problems/recover-binary-search-tree/description/"]],
      ["Path Sum", "Easy", ["https://leetcode.com/problems/path-sum/description/"]],
      ["Path Sum II", "Medium", ["https://leetcode.com/problems/path-sum-ii/"]],
      ["Sum Root to Leaf Numbers", "Medium", ["https://leetcode.com/problems/sum-root-to-leaf-numbers/description/"]],
      ["Binary Tree Maximum Path Sum", "Hard", ["https://leetcode.com/problems/binary-tree-maximum-path-sum/description/"]],
      ["Construct Binary Tree from Preorder and Inorder Traversal", "Medium", ["https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/"]],
      ["Construct Binary Tree from Inorder and Postorder Traversal", "Medium", ["https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/"]],
      ["Convert Sorted Array to Binary Search Tree", "Easy", ["https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/"]],
      ["Serialize and Deserialize Binary Tree", "Hard", ["https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/"]],
    ],
  },
];

async function main() {
  const sheetTitle = "Instagram Daily DSA";

  await prisma.sheet.deleteMany({
    where: { title: sheetTitle },
  });

  await prisma.sheet.create({
    data: {
      title: sheetTitle,
      type: "PATTERN",
      topics: {
        create: data.map((topic) => ({
          name: topic.name,
          problems: {
            create: topic.problems.map(([title, difficulty, links]) => ({
              title,
              difficulty,
              link: links[0] || "https://example.com",
              description: buildDescription(links),
            })),
          },
        })),
      },
    },
  });

  const topicCount = data.length;
  const problemCount = data.reduce(
    (total, topic) => total + topic.problems.length,
    0
  );

  console.log(
    `Imported "${sheetTitle}" with ${topicCount} topics and ${problemCount} problems.`
  );
}

main()
  .catch((error) => {
    console.error("Import failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
