---
title: REal last blog post
date: 2025-04-08
excerpt: this is the real last blog post
---

 Adding special context tokens
We need to modify the tokenizer to handle unknown words. We also need to address
the usage and addition of special context tokens that can enhance a model’s understanding of context or other relevant information in the text. These special tokens
can include markers for unknown words and document boundaries, for example. In
particular, we will modify the vocabulary and tokenizer, SimpleTokenizerV2, to support two new tokens, <|unk|> and <|endoftext|>, as illustrated in figure 2.9