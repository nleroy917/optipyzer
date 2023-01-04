library(tidyverse)

times <- read_csv("results/optimization_times.csv")

times %>% 
  ggplot(aes(x=reorder(algorithm, -time), y=time, color=algorithm, fill=algorithm)) +
  geom_boxplot(alpha=0.6, show.legend=FALSE) +
  geom_point(show.legend=FALSE) + 
  theme_classic() +
  labs(x="Algorithm", y="Time to optimize (seconds)")

ggsave(
  "~/Desktop/time_analysis.svg",
  height=100,
  width=80,
  units="mm"
)

# statistical analysis
t.test(time ~ algorithm, data=times, alternative="two.sided")

# plot optimization time
times %>% 
  group_by(algorithm) %>% 
  summarize(
    avg=mean(time),
    sd=sd(time)
  ) %>% 
  ggplot(aes(x=reorder(algorithm, -avg),y=avg, fill=algorithm, color=algorithm)) +
  geom_col(alpha=0.7, width=0.7) + 
  geom_errorbar(aes(ymin=avg-sd, ymax=avg+sd), 
                width=.05, 
                color="black", 
                size=0.7,
                position=position_dodge(.9)
              )  +
  theme_classic() +
  labs(x="Algorithm", y="Time to Optimize (seconds)")
