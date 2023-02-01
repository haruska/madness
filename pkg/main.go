package main

import (
	"context"
	"fmt"
	"log"
	"strconv"

	worker "github.com/contribsys/faktory_worker_go"
)

func parseArgs(args ...interface{}) (nArgs [][]uint64, err error) {
	nArgs = make([][]uint64, 0, len(args))

	for _, arg := range args {
		arr, ok := arg.([]interface{})

		if !ok {
			return nil, fmt.Errorf("expected array. unexpected type %T\n", arg)
		}

		ns := make([]uint64, 0, len(arr))

		for _, s := range arr {
			str, ok := s.(string)

			if !ok {
				return nil, fmt.Errorf("expected string. unexpected type %T\n", s)
			}

			n, err := strconv.ParseUint(str, 16, 64)

			if err != nil {
				return nil, err
			}

			ns = append(ns, n)
		}

		nArgs = append(nArgs, ns)
	}

	return
}

func updateBestFinishesJob(ctx context.Context, args ...interface{}) error {
	help := worker.HelperFor(ctx)
	log.Printf("Working on job %s\n", help.Jid())
	log.Printf("args %v\n", args)

	nArgs, err := parseArgs(args)

	if err != nil {
		return err
	}

	log.Printf("nArgs %v\n", nArgs)
	log.Printf("brackets length: %v\n", len(nArgs[1]))
	return nil
}

func main() {
	mgr := worker.NewManager()

	// register job types and the function to execute them
	mgr.Register("UpdateBestFinishesJob", updateBestFinishesJob)
	//mgr.Register("AnotherJob", anotherFunc)

	// use up to N goroutines to execute jobs
	mgr.Concurrency = 20

	// pull jobs from these queues, in this order of precedence
	mgr.ProcessStrictPriorityQueues("eliminations")

	// alternatively you can use weights to avoid starvation
	//mgr.ProcessWeightedPriorityQueues(map[string]int{"critical":3, "default":2, "bulk":1})

	// Start processing jobs, this method does not return.
	mgr.Run()
}
